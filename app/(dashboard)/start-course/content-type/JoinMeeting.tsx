import { getVideoSdkSignature } from "@/libs/api/services/zoom.api";
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

  return loading ? (
    <ActivityIndicator size="small" />
  ) : (
    <Button title={props.label} onPress={getSignatureAndJoin} />
  );
}
