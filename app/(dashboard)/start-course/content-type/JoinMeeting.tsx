import { getVideoSdkSignature } from "@/libs/api/services/zoom.api";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Button } from "react-native";
// your API call to get signature

interface JoinMeetingProps {
  role: number;
  label: string;
  name: string;
  meetingId: string | number;
  password: string;
}

const JoinMeeting = (props: JoinMeetingProps) => {
  const [loading, setLoading] = useState(false);

  const getSignatureAndJoin = async () => {
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
              await startMeeting(response);
            } else {
              Alert.alert("Error", "Failed to get Zoom signature.");
            }
          } catch (error) {
            Alert.alert("Error", "Failed to get signature");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const startMeeting = async (signature: string) => {};

  return loading ? (
    <ActivityIndicator size="small" />
  ) : (
    <Button title={props.label} onPress={getSignatureAndJoin} />
  );
};

export default JoinMeeting;
