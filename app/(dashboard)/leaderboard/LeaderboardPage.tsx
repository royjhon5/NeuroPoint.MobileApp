import useUserDetails from "@/libs/hooks/useUserDetails";
import { View } from "react-native";
import { Text } from "react-native-paper";
import useStudentAssessments from "../../../libs/hooks/useStudentAssessment";
import StudentLeaderboard from "./LeaderBoard";

const LeaderboardPage = () => {
  const { list } = useStudentAssessments();
  const { getUserDetails } = useUserDetails();
  return (
    <View
      style={{
        paddingLeft: 3,
        paddingRight: 3,
        paddingBottom: 125,
      }}
    >
      <Text
        style={{
          marginBottom: 3,
          fontWeight: 600,
          color: "#1a365d",
          textAlign: "center",
          marginTop: 20,
          fontSize: 28,
        }}
      >
        Leaderboard
      </Text>
      {getUserDetails?.currentPackage.paymentStatus === 0 ? (
        <View className="p-4">
          <View className="w-full flex items-center justify-center p-4 bg-yellow-100 rounded-md my-4">
            <Text>
              ⚠️ Payment verification pending. Please wait for admin approval.
            </Text>
          </View>
        </View>
      ) : (
        <StudentLeaderboard students={list} />
      )}
    </View>
  );
};

export default LeaderboardPage;
