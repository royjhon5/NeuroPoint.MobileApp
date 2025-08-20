import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Button, List, Text } from "react-native-paper";
import HTML from "react-native-render-html";
import useCourseEnrollment from "../../../libs/hooks/useCourseEnrollment";
import useGetCourse from "../../../libs/hooks/useGetCourse";
type User = {
  userId: string;
  username: string;
  role: string;
  email: string;
  branchId: number;
};
export default function CourseOverView() {
  const [userData, setUserData] = useState<User | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;
  const { course, curriculumCount, lessonsCount, coursedata } = useGetCourse(
    Number(id)
  );

  const { onSubmit, isPending } = useCourseEnrollment();
  const handleEnroll = () => {
    onSubmit(Number(id), String(userData?.userId), Number(userData?.branchId));
  };
  const { width } = useWindowDimensions();
  const allTopics =
    coursedata &&
    "curriculum" in coursedata &&
    Array.isArray(coursedata.curriculum)
      ? coursedata.curriculum.flatMap((curriculumItem: any) =>
          Array.isArray(curriculumItem.topics) ? curriculumItem.topics : []
        )
      : [];

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        const user = JSON.parse(value);
        return user;
      }
    } catch (e) {
      console.error("Failed to fetch data from storage", e);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getData();
      if (user) {
        setUserData(user);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <ScrollView>
        <SafeAreaView
          style={{
            flex: 1,
            padding: 16,
            backgroundColor:
              "linear-gradient(to right, rgb(243, 244, 246), rgb(229, 231, 235))",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              color: "rgb(26, 54, 93)",
            }}
          >
            {course?.name}
          </Text>
          <View style={styles.fullContent}>
            <HTML
              source={{ html: course?.description || "" }}
              contentWidth={width}
              baseStyle={styles.htmlBase}
            />
          </View>
          {coursedata?.course.isEnrolled ? (
            <Button
              mode="contained"
              style={{ marginTop: 15, backgroundColor: "rgb(2, 65, 190)" }}
              onPress={() =>
                router.push({
                  pathname: "/(dashboard)/start-course",
                  params: { id: id },
                })
              }
            >
              Start Course
            </Button>
          ) : (
            <Button
              mode="contained"
              style={{ marginTop: 15, backgroundColor: "rgb(2, 65, 190)" }}
              onPress={handleEnroll}
            >
              {isPending ? "Loading..." : "Take Course"}
            </Button>
          )}
        </SafeAreaView>
        <SafeAreaView
          style={{
            flex: 1,
            padding: 16,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "rgb(26, 54, 93)",
              textAlign: "center",
              marginTop: 15,
            }}
          >
            Course Curriculum
          </Text>
          <View style={styles.section}>
            <Text
              style={{
                padding: 10,
                textAlign: "center",
                backgroundColor: "rgb(25, 118, 210)",
                borderRadius: 5,
                color: "white",
              }}
            >
              {curriculumCount} Topics
            </Text>
            <Text
              style={{
                padding: 10,
                textAlign: "center",
                backgroundColor: "rgb(156, 39, 176)",
                borderRadius: 5,
                color: "white",
              }}
            >
              {lessonsCount} Lessons
            </Text>
          </View>
          <View>
            <List.Section title="Topics and Lessons">
              {allTopics?.map((topic: any, i: any) => (
                <List.Accordion
                  key={`topic-${i}`}
                  title={topic.name}
                  left={(props) => <List.Icon {...props} icon="folder" />}
                >
                  {topic.lessons?.map((lesson: any, j: any) => (
                    <List.Item
                      key={`lesson-${i}-${j}`}
                      title={lesson.name || `Lesson ${j + 1}`}
                      left={(props) => (
                        <List.Icon {...props} icon="file-document-outline" />
                      )}
                    />
                  ))}
                </List.Accordion>
              ))}
            </List.Section>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    width: "100%",
    padding: 10,
    paddingBottom: 20, // Add some bottom padding
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  viewMore: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 8,
  },
  announcementContainer: {
    marginBottom: 24,
  },
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 16,
    marginTop: 16,
  },
  image: {
    height: 200,
  },
  textFont: {
    fontWeight: "bold",
  },
  buttonStyle: {
    marginTop: 10,
    backgroundColor: "#1976d2",
    borderRadius: 8,
  },
  cartStyle: {
    marginTop: 15,
  },
  cardTitle: {
    marginTop: 10,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1976d2",
  },
  progressbarStyle: {
    marginBottom: 10,
    marginTop: 10,
  },
  buttosPlacement: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    marginTop: 10,
  },
  buttosPlacementTwo: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    alignContent: "center",
  },
  card: {
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  excitingText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 12,
    fontStyle: "italic",
  },
  startDate: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    color: "red", // or any accent color you prefer
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 12,
  },
  fullContent: {
    marginTop: 16,
  },
  htmlBase: {
    fontSize: 16,
    lineHeight: 24,
  },
});
