import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { StudentAssessmentDto } from "../../../types/DTO/AssessmentDTO";

type LeaderboardProps = {
  students: StudentAssessmentDto[];
};

const rankColors = {
  1: ["#FFD700", "#FDB931"],
  2: ["#C0C0C0", "#A8A8A8"],
  3: ["#CD7F32", "#A85C10"],
} as const;
const StudentLeaderboard: React.FC<LeaderboardProps> = ({ students }) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: StudentAssessmentDto;
    index: number;
  }) => {
    const rank = index + 1;
    const isTopRank = rank <= 3;
    const gradientColors = rankColors[rank as 1 | 2 | 3];
    const scorePercent = ((item.score / item.totalQuestions) * 100).toFixed(2);

    const GradientWrapper = isTopRank
      ? ({ children }: { children: React.ReactNode }) => (
          <LinearGradient
            colors={gradientColors}
            style={[styles.card, styles.gradientCard]}
          >
            {children}
          </LinearGradient>
        )
      : ({ children }: { children: React.ReactNode }) => (
          <Card style={styles.card}>{children}</Card>
        );

    return (
      <GradientWrapper>
        <TouchableOpacity style={styles.row}>
          <Text style={[styles.rank, isTopRank && styles.rankTop]}>
            Rank No.{rank}
          </Text>

          <View style={styles.info}>
            <Avatar.Text
              size={50}
              label={`${item.firstName[0]}${item.lastName[0]}`}
              style={[
                styles.avatar,
                isTopRank && { borderWidth: 3, borderColor: "white" },
              ]}
            />
            <Text
              style={[
                styles.name,
                isTopRank && {
                  color: "white",
                  textDecorationLine: "underline",
                },
              ]}
            >
              {item.firstName} {item.lastName}
            </Text>
          </View>

          <Text style={[styles.score, isTopRank && styles.scoreTop]}>
            {scorePercent}%
          </Text>
        </TouchableOpacity>
      </GradientWrapper>
    );
  };

  return (
    <FlatList
      data={students}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
  },
  gradientCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: "column",
    gap: 12,
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
  },
  rankTop: {
    color: "white",
    fontSize: 24,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    backgroundColor: "#90caf9",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1976d2",
  },
  score: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00796b",
  },
  scoreTop: {
    color: "white",
    fontSize: 24,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  topButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 2,
    borderColor: "white",
  },
});

export default StudentLeaderboard;
