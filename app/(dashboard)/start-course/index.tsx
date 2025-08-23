import useGetAllUsers from "@/libs/hooks/useGetAllUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  List,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import WebView from "react-native-webview";
import { createLessonProgress } from "../../../libs/api/services/lesson-progress.api";
import { submitQuizAnswer } from "../../../libs/api/services/lessons.api";
import useGetAssessment from "../../../libs/hooks/useGetAssessment";
import useGetLessons from "../../../libs/hooks/useGetLessons";
import useGetStudentAnswers from "../../../libs/hooks/useGetStudentAnswers";
import useGetstudentCourse from "../../../libs/hooks/useGetStudentCourse";
import { LessonDTO } from "../../../types/DTO/CourseDTO";
import { LessonsDTO, StudentAnswerTypeDTO } from "../../../types/DTO/LessonDTO";
import LectureContent from "./content-type/LectureContent";
import PrePostAssessment from "./content-type/PrePostAssessment";
import QuizForm from "./content-type/QuizForm";
function countCorrectAnswers(
  studentAnswers: StudentAnswerTypeDTO[],
  actualQuestions: LessonsDTO[]
) {
  let correctCount = 0;

  studentAnswers.forEach((studentAnswer: StudentAnswerTypeDTO) => {
    const question = actualQuestions.find(
      (q) => q.id === studentAnswer.questionId
    );
    if (question) {
      const correctChoice = question.choices.find(
        (choice: { id: number; isCorrect: boolean; choice: string }) =>
          choice.isCorrect
      );

      if (!correctChoice) return;

      if (correctChoice.choice === studentAnswer.answerName) {
        correctCount++;
      }
    }
  });

  return correctCount;
}

type AnswerType = {
  questionId: number;
  choiceId: number;
  choice: string;
};

export default function StartCourse() {
  const { userList } = useGetAllUsers();

  const instructorList = userList
    .filter((prop) => {
      return prop.roles.includes("Instructor");
    })
    .map((prop) => {
      return { text: `${prop.firstName} ${prop.lastName}`, value: prop.id };
    });
  const params = useLocalSearchParams();
  const { id } = params;
  const [userId, setUserId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonDTO | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerType[]>([]);
  const [isTakingQuiz, setIsTakingQuiz] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [isViewingSubmission, setIsViewingSubmission] = useState(false);

  const lessonId = Number(selectedLesson?.id);
  const { studentcoursedata, refetchData, isPending } = useGetstudentCourse(
    Number(id),
    userId
  );

  const instructor = instructorList.find(
    (x) =>
      x.value ===
      String(studentcoursedata?.curriculum[0].topics[0].instructorId ?? "")
  )?.text;

  const { answersList, refetch } = useGetStudentAnswers(lessonId || 0);
  const { lessonsdata } = useGetLessons(lessonId || 0);
  const { width } = useWindowDimensions();
  const { assessmentdata } = useGetAssessment();
  const isAllAnswered =
    lessonsdata.length > 0 &&
    lessonsdata.every((q: any) =>
      selectedAnswers.find((a) => a.questionId === q.id)
    );
  useEffect(() => {
    refetch();
  }, [lessonId, refetch]);
  const scorePercentage = () => {
    return (
      (countCorrectAnswers(answersList, lessonsdata) / lessonsdata.length) * 100
    );
  };

  const isPassed = () => {
    if (assessmentdata)
      return scorePercentage() >= assessmentdata[0].passingScore;
  };

  const showLessonModal = (lesson: any) => {
    setSelectedLesson(lesson);
    setVisible(true);
  };

  const hideLessonModal = () => {
    setVisible(false);
    setSelectedLesson(null);
    setSelectedAnswers([]);
    setIsTakingQuiz(false);
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userid");
      if (value !== null) {
        setUserId(value);
        return value;
      }
    } catch (e) {
      console.error("Failed to fetch data from storage", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const videoSource = selectedLesson?.filePath ?? "";
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const markLessonComplete = async () => {
    setLoading(true);
    try {
      await createLessonProgress({
        courseId: selectedCourseId,
        lessonId: lessonId,
        userId: userId as string,
      });
      Toast.show({
        type: "success",
        text1: "Mark as done!",
      });
      refetchData();
      setVisible(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    answer: { questionId: number; choiceId: number; choice: string }[]
  ) => {
    try {
      const params = answer.map((prop) => {
        return {
          questionId: prop.questionId,
          answerId: prop.choiceId,
          answerName: prop.choice,
        };
      });
      const response = await submitQuizAnswer({
        answers: params,
        lessonId,
        assessmentId: lessonsdata[0].assessmentId as number,
      });

      if (response.isSuccess) {
        Toast.show({
          type: "success",
          text1: "Answers successfully submitted.",
        });
        refetch();
        markLessonComplete();
      } else {
        Toast.show({
          type: "error",
          text1: `${response.validatorError.message}`,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Failed to submit.",
      });
    }
  };
  const contents: LessonDTO[] =
    studentcoursedata?.curriculum?.flatMap((curriculum: any) =>
      curriculum.topics.flatMap((topic: any) => topic.lessons)
    ) ?? [];

  const isLessonDisabled = (
    lessonId: number,
    topicIndex: number,
    lessonIndex: number
  ): boolean => {
    const lesson = contents?.find((prop) => prop.id === lessonId);
    const currentIndex = contents?.indexOf(lesson as LessonDTO);
    if (topicIndex === 0 && lessonIndex === 0) return false;
    if (lesson?.isCompleted) return false;
    if (currentIndex && contents[currentIndex - 1]?.isCompleted) return false;
    return true;
  };

  const handleChange = (
    questionId: number,
    choiceId: number,
    choice: string
  ) => {
    setSelectedAnswers((prev) => {
      const updatedAnswers = prev.filter(
        (answer) => answer.questionId !== questionId
      );
      return [...updatedAnswers, { questionId, choiceId, choice }];
    });
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 16,
          backgroundColor:
            "linear-gradient(to right, rgb(243, 244, 246), rgb(229, 231, 235))",
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              display: "flex",
              textAlign: "center",
            }}
          >
            Welcome to the course! 👋
          </Text>
        </View>
        <ScrollView>
          <List.Section>
            {isPending ? (
              <View className="flex flex-col gap-2 items-center justify-center h-80">
                <ActivityIndicator animating={true} color="blue" size="large" />
              </View>
            ) : (
              studentcoursedata?.curriculum?.map((curriculumItem: any) => (
                <List.Accordion
                  key={`curriculum-${curriculumItem.id}`}
                  title={curriculumItem.name}
                  onPress={() => setSelectedCourseId(curriculumItem.courseId)}
                  style={{ borderRadius: 10 }}
                >
                  {curriculumItem.topics?.map((topic: any, topicIndex: any) => (
                    <List.Accordion
                      key={`topic-${topic.id}`}
                      title={
                        <View
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "row",
                            gap: 15,
                          }}
                        >
                          <Text>{topic.name}</Text>
                          <Text>{`${
                            topic.lessons.filter(
                              (lesson: any) => lesson.isCompleted
                            ).length
                          }/${topic.lessons.length}`}</Text>
                        </View>
                      }
                    >
                      {topic.lessons?.map((lesson: any, lessonIndex: any) => {
                        const disabled = isLessonDisabled(
                          lesson.id,
                          topicIndex,
                          lessonIndex
                        );
                        return (
                          <List.Item
                            key={`lesson-${lesson.id}`}
                            title={lesson.name || `Lesson ${lesson.id + 1}`}
                            disabled={disabled}
                            onPress={
                              disabled
                                ? undefined
                                : () => showLessonModal(lesson)
                            }
                            style={{
                              padding: 10,
                              backgroundColor:
                                lesson.id === lessonId
                                  ? "#eceeff"
                                  : disabled
                                  ? "#f5f5f5"
                                  : "",
                              opacity: disabled ? 0.5 : 1,
                            }}
                            left={(props) =>
                              lesson.isCompleted ? (
                                <List.Icon
                                  {...props}
                                  icon="check-circle"
                                  color="rgb(25, 118, 210)"
                                />
                              ) : (
                                <List.Icon
                                  {...props}
                                  icon="check-circle-outline"
                                />
                              )
                            }
                          />
                        );
                      })}
                    </List.Accordion>
                  ))}
                </List.Accordion>
              ))
            )}
          </List.Section>
        </ScrollView>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideLessonModal}
            contentContainerStyle={styles.modalContainer}
          >
            {selectedLesson && (
              <>
                {!isTakingQuiz ? (
                  <>
                    <Text variant="titleMedium">{selectedLesson.name}</Text>

                    {/* lecture */}
                    {selectedLesson?.typeName === "Lecture" && (
                      <LectureContent
                        lessonId={lessonId}
                        zoomDetails={{
                          instructorName: instructor,
                          zoomSchedule: selectedLesson?.zoomSchedule as string,
                        }}
                        lessonType={"Lecture"}
                      />
                    )}
                    {/* Video */}
                    {selectedLesson?.typeName === "Video" &&
                      selectedLesson.filePath && (
                        <VideoView
                          style={styles.video}
                          player={player}
                          allowsFullscreen
                          allowsPictureInPicture
                        />
                      )}
                    {/* Pre-Test / Post-Test Assessment */}
                    {(selectedLesson?.typeName === "Pre-Test" ||
                      selectedLesson?.typeName === "Post-Test") && (
                      <>
                        <PrePostAssessment
                          selectedLesson={selectedLesson}
                          lessonsdata={lessonsdata}
                          answersList={answersList}
                          assessmentdata={assessmentdata || []}
                          onStartQuiz={() => {
                            setIsViewingSubmission(false);
                            setIsTakingQuiz(true);
                          }}
                          onViewSubmission={() => {
                            setIsViewingSubmission(true);
                            setIsTakingQuiz(true);
                          }}
                          scorePercentage={scorePercentage()}
                          isPassed={!!isPassed()}
                          isDisabled={selectedLesson.isCompleted}
                        />
                      </>
                    )}
                    {/* Image */}
                    {selectedLesson?.typeName?.toLowerCase() === "File" &&
                      selectedLesson?.filePath?.trim() && (
                        <View className="p-2">
                          {/* <Image
                            source={{ uri: selectedLesson.filePath }}
                            style={{ width: 10, height: 10 }}
                          /> */}
                          <WebView
                            source={{
                              uri: `https://docs.google.com/viewer?url=${encodeURIComponent(
                                selectedLesson.filePath
                              )}&embedded=true`,
                            }}
                            originWhitelist={["*"]}
                            style={{
                              flex: 1,
                            }}
                          />
                        </View>
                      )}

                    {/* Description */}
                    {selectedLesson.description && (
                      <View style={{ marginTop: 10 }}>
                        <RenderHTML
                          contentWidth={width}
                          source={{ html: selectedLesson.description }}
                          tagsStyles={{
                            p: { marginBottom: 10 },
                            strong: { fontWeight: "bold" },
                          }}
                        />
                        {selectedLesson.isCompleted !== true ? (
                          <Button
                            onPress={() => markLessonComplete()}
                            mode="contained"
                            color="primary"
                            disabled={loading}
                          >
                            {loading ? (
                              <View
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 10,
                                }}
                              >
                                <ActivityIndicator
                                  size="small"
                                  animating={true}
                                  color={"blue"}
                                />
                                <Text>Please wait ...</Text>
                              </View>
                            ) : (
                              "Mark as completed"
                            )}
                          </Button>
                        ) : (
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 10,
                              padding: 5,
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "green",
                              borderRadius: 5,
                            }}
                          >
                            <Icon
                              color="white"
                              source="check-decagram"
                              size={20}
                            />
                            <Text style={{ color: "white" }}>Completed</Text>
                          </View>
                        )}
                      </View>
                    )}
                  </>
                ) : (
                  <QuizForm
                    questions={lessonsdata}
                    selectedAnswers={
                      isViewingSubmission
                        ? answersList.map((a) => ({
                            questionId: a.questionId,
                            choiceId: a.answerId,
                            choice: a.answerName,
                          }))
                        : selectedAnswers
                    }
                    answersList={answersList}
                    onAnswerChange={
                      isViewingSubmission ? undefined : handleChange
                    }
                    onSubmit={
                      isViewingSubmission
                        ? undefined
                        : () => handleSubmit(selectedAnswers)
                    }
                    onCancel={() => {
                      setIsTakingQuiz(false);
                      setSelectedAnswers([]);
                      setIsViewingSubmission(false);
                    }}
                    isAllAnswered={isAllAnswered}
                    isPassed={!!isPassed()}
                    scorePercentage={scorePercentage()}
                    readOnly={isViewingSubmission} // <-- extra prop
                  />
                )}
              </>
            )}
          </Modal>
        </Portal>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F4F6",
  },
  title: {
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginRight: 5,
    borderRadius: 8,
    width: "100%",
    maxHeight: "80%",
  },
  video: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
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
  icon: {
    marginRight: 12,
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
});
