import { View } from "react-native";
import { Text } from "react-native-paper";
import useStudentAssessments from "../../../libs/hooks/useStudentAssessment";
import StudentLeaderboard from "./LeaderBoard";

const LeaderboardPage = () => {
  const { list } = useStudentAssessments();
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
      <StudentLeaderboard students={list} />
    </View>
  );
};

export default LeaderboardPage;
