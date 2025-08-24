import React from "react";
import { Text } from "react-native";
interface JoinMeetingProps {
  role: number;
  label: string;
  name: string;
  meetingId: string | number;
  password: string;
  zoomLink: string;
}

export default function JoinMeeting(props: JoinMeetingProps) {
  return <Text>Zoom Link: {props.zoomLink} </Text>;
}
