import { getVideoSdkSignature } from "@/libs/api/services/zoom.api";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Button } from "react-native";

interface JoinMeetingProps {
  role: number;
  label: string;
  name: string;
  meetingId: string | number;
  password: string;
}

export default function JoinMeeting(props: JoinMeetingProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getSignatureAndJoin = () => {
    Alert.alert("Proceed to Zoom?", undefined, [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          setLoading(true);
          try {
            const { response, isSuccess } = await getVideoSdkSignature({
              meetingNumber: props.meetingId.toString(),
              role: props.role,
            });

            if (isSuccess && response) {
              startMeeting(response);
            } else {
              Alert.alert("Error", "Failed to get Zoom signature.");
            }
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to get signature");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const startMeeting = (signature: string) => {
    const html = `
      <html>
        <head>
          <script src="https://source.zoom.us/2.17.0/lib/vendor/react.min.js"></script>
          <script src="https://source.zoom.us/2.17.0/lib/vendor/react-dom.min.js"></script>
          <script src="https://source.zoom.us/zoom-meeting-2.17.0.min.js"></script>
          <script>
            ZoomMtg.setZoomJSLib('https://source.zoom.us/2.17.0/lib', '/av');
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareJssdk();

            document.addEventListener('DOMContentLoaded', function () {
              ZoomMtg.init({
                leaveUrl: 'https://zoom.us',
                success: function () {
                  ZoomMtg.join({
                    signature: '${signature}',
                    meetingNumber: '${props.meetingId}',
                    userName: '${props.name}',
                    sdkKey: '${process.env.EXPO_PUBLIC_CLIENTSDK_ZOOM}',
                    passWord: '${props.password}',
                    success: function () {
                      console.log('Joined meeting successfully');
                    },
                    error: function (error) {
                      console.error(error);
                    }
                  });
                }
              });
            });
          </script>
        </head>
        <body></body>
      </html>
    `;

    router.push({
      pathname: "/(dashboard)/start-course/content-type/ZoomViewScreen",
      params: { html: encodeURIComponent(html) }, // pass as URL param
    });
  };

  return loading ? (
    <ActivityIndicator size="small" />
  ) : (
    <Button title={props.label} onPress={getSignatureAndJoin} />
  );
}
