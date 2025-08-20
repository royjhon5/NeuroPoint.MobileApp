import { getVideoSdkSignature } from "@/libs/api/services/zoom.api";
import { useZoom } from "@zoom/meetingsdk-react-native";
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
  const zoom = useZoom();
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
              console.log(response);
              handleJoin(response);
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

  const handleJoin = async (signature: string) => {
    await zoom.startMeeting({
      userName: props.name,
      meetingNumber: props.meetingId.toString(),
      zoomAccessToken: signature,
    });
  };

  return loading ? (
    <ActivityIndicator size="small" />
  ) : (
    <Button title={props.label} onPress={getSignatureAndJoin} />
  );
}
