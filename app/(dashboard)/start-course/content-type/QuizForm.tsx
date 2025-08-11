import React from "react";
import { ScrollView, View } from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";
import { LessonsDTO } from "../../../../types/DTO/LessonDTO";

type Props = {
  questions: LessonsDTO[];
  selectedAnswers: {
    questionId: number;
    choiceId: number;
    choice: string;
  }[];
  answersList: any[];
  onAnswerChange?: (
    questionId: number,
    choiceId: number,
    choice: string
  ) => void;
  onSubmit?: () => void;
  onCancel: () => void;
  isAllAnswered: boolean;
  isPassed: boolean;
  scorePercentage: number;
  readOnly?: boolean;
};

export default function QuizForm({
  questions,
  selectedAnswers,
  answersList,
  onAnswerChange,
  onSubmit,
  onCancel,
  isAllAnswered,
  isPassed,
  scorePercentage,
}: Props) {
  const readOnly = answersList.length > 0; // true if viewing submission

  return (
    <View>
      {!readOnly ? (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Quiz</Text>
      ) : (
        <View style={{ display: "flex", gap: 1 }}>
          <Text style={{ fontWeight: "700" }}>Your grade:</Text>
          <Text
            style={{
              color: isPassed ? "#007748" : "#ed6b7efc",
              fontWeight: "700",
            }}
          >
            {Math.floor(scorePercentage)} %
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {questions.map((question) => {
          const correctChoice = question.choices.find((c: any) => c.isCorrect);
          const userAnswer = answersList.find(
            (ans) => ans.questionId === question.id
          );

          return (
            <View key={question.id} style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {questions.indexOf(question) + 1}. {question.question}
              </Text>

              {question.choices.map((choice: any) => {
                let backgroundColor = "transparent";

                if (readOnly) {
                  if (choice.id === correctChoice?.id) {
                    backgroundColor = "#d4edda"; // light green for correct
                  }
                  if (
                    userAnswer &&
                    userAnswer.choiceId === choice.id &&
                    choice.id !== correctChoice?.id
                  ) {
                    backgroundColor = "#f8d7da"; // light red for wrong
                  }
                }

                return (
                  <View
                    key={choice.id}
                    style={{
                      backgroundColor,
                      borderRadius: 6,
                      marginVertical: 2,
                    }}
                  >
                    <RadioButton.Item
                      label={choice.choice}
                      value={choice.choice}
                      mode="android"
                      status={
                        selectedAnswers.find(
                          (a) => a.questionId === question.id
                        )?.choice === choice.choice
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() => {
                        if (!readOnly && onAnswerChange) {
                          // Check if onAnswerChange exists
                          const choiceId = choice.id;
                          onAnswerChange(question.id, choiceId, choice.choice);
                        }
                      }}
                    />
                  </View>
                );
              })}
            </View>
          );
        })}

        {!readOnly && (
          <Button
            mode="contained"
            disabled={!isAllAnswered}
            onPress={onSubmit}
            style={{ marginTop: 16 }}
          >
            Submit Answer
          </Button>
        )}

        <Button mode="contained" style={{ marginTop: 10 }} onPress={onCancel}>
          {readOnly ? "Close" : "Cancel Quiz"}
        </Button>
      </ScrollView>
    </View>
  );
}
