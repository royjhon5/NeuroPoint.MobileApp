import JoinMeeting from "@/app/(dashboard)/start-course/content-type/JoinMeeting";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-paper";
import { getZoomScheduleByLesson } from "../../../../libs/api/services/zoom.api";

interface LectureContentProps {
  lessonId: number;
  zoomDetails: {
    instructorName: string | undefined;
    zoomSchedule: string | undefined;
  };
  lessonType: string;
}

const LectureContent = ({
  lessonId,
  zoomDetails,
  lessonType,
}: LectureContentProps) => {
  const [zoomScheduleDetails, setZoomScheduleDetails] = useState<{
    topic: string;
    meetingId: number;
    password: string;
  }>({
    topic: "",
    meetingId: 0,
    password: "",
  });

  const schedule = dayjs(zoomDetails.zoomSchedule);
  const zoomSchedule = schedule.format("MMMM D, YYYY h:mm A");

  const isZoomScheduleActive = () => {
    if (!zoomDetails.zoomSchedule) return false;
    return dayjs().isBefore(schedule) ? false : true;
  };

  const getZoomMeetingSchedule = async (lessonId: number) => {
    const result = await getZoomScheduleByLesson(lessonId);
    const { topic, meetingId, password } = result.response;
    if (result.isSuccess) {
      setZoomScheduleDetails({ topic, meetingId, password });
    }
  };

  useEffect(() => {
    setZoomScheduleDetails({ topic: "", meetingId: 0, password: "" });
    if (lessonType === "Lecture") getZoomMeetingSchedule(lessonId);
  }, [lessonId, lessonType]);

  console.log(zoomScheduleDetails);
  return (
    <View style={{ marginTop: 5 }}>
      <View
        className="flex flex-col p-5 rounded-xl"
        style={{
          backgroundColor: "#f0f6ff",
        }}
      >
        <Text style={{ fontWeight: 600 }}>Details</Text>
        <View className="mt-2 flex flex-col gap-3">
          <View className="flex flex-row gap-2">
            <Text
              style={{
                fontSize: 17,
              }}
            >
              <Icon source="account" size={20} /> Lecturer:
            </Text>
            <Text className="text-blue-400" style={{ fontSize: 17 }}>
              {zoomDetails.instructorName}
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text style={{ fontSize: 17 }}>
              <Icon source="calendar" size={20} /> Topic:
            </Text>
            <Text className="text-blue-400" style={{ fontSize: 17 }}>
              {zoomScheduleDetails.topic}
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text style={{ fontSize: 17 }}>
              <Icon source="calendar-month" size={20} /> Schedule:
            </Text>

            <Text className="text-blue-400" style={{ fontSize: 17 }}>
              {zoomDetails.zoomSchedule
                ? zoomSchedule
                : "No zoom schedule created yet."}
            </Text>
          </View>
          {isZoomScheduleActive() && (
            <Text className="p-2 bg-green-100" style={{ fontSize: 13 }}>
              The Zoom lecture is now live. Join the session to participate.
            </Text>
          )}
          {isZoomScheduleActive() && (
            <View style={{ display: "flex" }}>
              <JoinMeeting
                name={"test"}
                role={0}
                label="Join Zoom Lecture"
                meetingId={zoomScheduleDetails.meetingId}
                password={zoomScheduleDetails.password}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default LectureContent;
