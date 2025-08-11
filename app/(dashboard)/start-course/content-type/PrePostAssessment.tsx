// components/PrePostAssessment.tsx
import { StyleSheet, View } from "react-native";
import { Button, Divider, Icon, Text, useTheme } from "react-native-paper";
import { AssessmentDTO } from "../../../../types/DTO/AssessmentDTO";
import {
  LessonsDTO,
  StudentAnswerTypeDTO,
} from "../../../../types/DTO/LessonDTO";

type Props = {
  selectedLesson: { name: string; typeName: string };
  lessonsdata: LessonsDTO[];
  answersList: StudentAnswerTypeDTO[];
  assessmentdata: AssessmentDTO[];
  onStartQuiz: () => void;
  onViewSubmission: () => void;
  scorePercentage: number;
  isPassed: boolean;
  isDisabled: boolean;
};

const countCorrectAnswers = (
  studentAnswers: StudentAnswerTypeDTO[],
  actualQuestions: LessonsDTO[]
) => {
  let correctCount = 0;
  studentAnswers.forEach((studentAnswer) => {
    const question = actualQuestions.find(
      (q) => q.id === studentAnswer.questionId
    );
    const correctChoice = question?.choices.find((c: any) => c.isCorrect);
    if (correctChoice?.choice === studentAnswer.answerName) {
      correctCount++;
    }
  });
  return correctCount;
};

export default function PrePostAssessment({
  selectedLesson,
  lessonsdata,
  answersList,
  assessmentdata,
  onStartQuiz,
  onViewSubmission,
  scorePercentage,
  isPassed,
  isDisabled,
}: Props) {
  const theme = useTheme();

  const filtered = assessmentdata.filter(
    (item) => item.type === selectedLesson.typeName
  );

  return filtered.map((item, index) => (
    <View key={index}>
      <View style={styles.container}>
        <Text style={styles.title}>Details</Text>

        <View style={styles.stack}>
          <View style={styles.item}>
            <Icon source="star" size={15} color={theme.colors.primary} />
            <View>
              <Text style={styles.label}>Score</Text>
              <Text style={[styles.value, { color: theme.colors.primary }]}>
                {countCorrectAnswers(answersList, lessonsdata)} /{" "}
                {lessonsdata.length}
              </Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.item}>
            <Icon source="check-circle" size={15} color="green" />
            <View>
              <Text style={styles.label}>Passing Grade</Text>
              <Text style={[styles.value, { color: theme.colors.primary }]}>
                {item.passingScore} %
              </Text>
            </View>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.item}>
            <Icon source="frequently-asked-questions" size={15} />
            <View>
              <Text style={styles.label}>Total Questions</Text>
              <Text style={styles.value}>{lessonsdata.length}</Text>
            </View>
          </View>
        </View>
      </View>

      {answersList.length > 0 ? (
        <View
          style={{
            marginTop: 5,
            padding: 10,
            backgroundColor: isPassed ? "#16c47f5c" : "#fad2d875",
          }}
        >
          <Text style={{ fontWeight: "700", marginBottom: 2 }}>Your grade</Text>
          <Text
            style={{
              color: isPassed ? "#007748" : "#ed6b7efc",
              fontWeight: "700",
              marginBottom: 2,
            }}
          >
            {Math.floor(scorePercentage)} % {isPassed ? "Passed" : "Failed"}
          </Text>

          <Button
            mode="contained"
            style={{
              position: "absolute",
              right: 10,
              top: 10,
              alignSelf: "auto",
              width: 130,
              height: 35,
              backgroundColor: "#1565c0",
            }}
            labelStyle={{ fontSize: 12, marginBottom: 0 }}
            onPress={onViewSubmission}
          >
            View Submission
          </Button>
        </View>
      ) : (
        <Button
          mode="contained"
          color="primary"
          style={{ marginTop: 4 }}
          onPress={onStartQuiz}
          disabled={isDisabled}
        >
          Start Quiz
        </Button>
      )}
    </View>
  ));
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f6ff",
    borderRadius: 8,
    padding: 15,
  },
  stack: {
    flexDirection: "column",
    gap: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
  },
  divider: {
    marginVertical: 12,
  },
  title: {
    marginBottom: 10,
  },
});
