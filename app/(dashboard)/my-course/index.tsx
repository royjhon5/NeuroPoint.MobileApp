import useUserDetails from "@/libs/hooks/useUserDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Icon,
  ProgressBar,
  Text,
} from "react-native-paper";
import HTML from "react-native-render-html";
import useGetAnnouncement from "../../../libs/hooks/useGetAnnouncement";
import useGetEnrollment from "../../../libs/hooks/useGetEnrollment";

export default function MyCourse() {
  const router = useRouter();
  const { announcementdata } = useGetAnnouncement();
  const { getUserDetails } = useUserDetails();
  const { width } = useWindowDimensions();
  const [expandedAnnouncements, setExpandedAnnouncements] = useState<number[]>(
    []
  );
  const [userId, setUserId] = useState<string | null>(null);
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
  const { enrollmentdata, isLoading } = useGetEnrollment(userId ?? "");
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedAnnouncements((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const renderContent = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.textFont} variant="titleLarge">
          My Course
        </Text>
        <Button
          icon="school"
          style={styles.buttonStyle}
          mode="contained"
          onPress={() => router.push("/(dashboard)/courses")}
        >
          View Available Course
        </Button>
        {getUserDetails?.currentPackage.paymentStatus === 0 ? (
          <View className="w-full flex items-center justify-center p-4 bg-yellow-100 rounded-md my-4">
            <Text>
              ⚠️ Payment verification pending. Please wait for admin approval.
            </Text>
          </View>
        ) : isLoading ? (
          <View className="flex flex-col gap-2 items-center justify-center h-full">
            <ActivityIndicator animating={true} color="blue" size="large" />
          </View>
        ) : (
          enrollmentdata.map((enroll: any) => {
            const total = enroll.totalLesson ?? 0;
            const current = enroll.totalCompletedLesson ?? 0;
            const progress = total > 0 ? current / total : 0;
            const percentage = Math.round(progress * 100);

            return (
              <ScrollView key={enroll.id}>
                <Card style={styles.cartStyle}>
                  <Card.Content>
                    <Card.Cover source={{ uri: enroll?.thumbnailUrl }} />
                    <Text style={styles.cardTitle} variant="titleLarge">
                      {enroll?.name}
                    </Text>
                    <ProgressBar
                      style={styles.progressbarStyle}
                      progress={Number.isNaN(progress) ? 0 : progress}
                      color={"blue"}
                    />
                    <Text variant="bodyMedium">{percentage}% Complete</Text>
                    <View style={styles.buttosPlacement}>
                      <Button
                        icon="card-text"
                        mode="text"
                        labelStyle={{ color: "blue" }}
                        onPress={() =>
                          router.push({
                            pathname: "/(dashboard)/course-overview",
                            params: { id: enroll.courseId },
                          })
                        }
                      >
                        Overview
                      </Button>
                      <Button
                        icon="play-circle"
                        mode="text"
                        labelStyle={{ color: "blue" }}
                        onPress={() =>
                          router.push({
                            pathname: "/(dashboard)/start-course",
                            params: { id: enroll.courseId },
                          })
                        }
                      >
                        Start
                      </Button>
                    </View>
                    <View style={styles.buttosPlacementTwo}>
                      <Text style={styles.cardTitle} variant="labelMedium">
                        <Icon source="school" size={15} />
                        Topics: {enroll?.totalTopics}
                      </Text>
                      <Text style={styles.cardTitle} variant="labelMedium">
                        <Icon source="book-open-variant" size={20} />
                        Lesson: {enroll?.totalLesson}
                      </Text>
                    </View>
                  </Card.Content>
                </Card>
              </ScrollView>
            );
          })
        )}

        <Card style={styles.card}>
          <Card.Content>
            <ScrollView style={styles.container}>
              <Text style={styles.header}>Announcements</Text>

              {announcementdata.map((announcement: any) => {
                const isExpanded = expandedAnnouncements.includes(
                  announcement.id
                );

                return (
                  <View
                    key={announcement.id}
                    style={styles.announcementContainer}
                  >
                    {/* Date and time */}
                    <Text style={styles.date}>
                      {formatDate(announcement.dateCreated)}
                    </Text>

                    {/* Main title */}
                    <Text style={styles.mainTitle}>{announcement.name}</Text>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* "View more" button */}
                    <TouchableOpacity
                      onPress={() => toggleExpand(announcement.id)}
                    >
                      <Text style={styles.viewMore}>
                        {isExpanded ? "View less" : "View more"}
                      </Text>
                    </TouchableOpacity>

                    {/* Attachments (show only if expanded) */}
                    {isExpanded && announcement.attachments?.length > 0 && (
                      <Image
                        source={{ uri: announcement.attachments[0].filePath }}
                        style={styles.image}
                        resizeMode="contain"
                      />
                    )}

                    {/* Full content (shown when expanded) */}
                    {isExpanded && (
                      <View style={styles.fullContent}>
                        <HTML
                          source={{ html: announcement.body }}
                          contentWidth={width}
                          baseStyle={styles.htmlBase}
                        />
                      </View>
                    )}

                    {/* Divider after content */}
                    {isExpanded && <View style={styles.divider} />}
                  </View>
                );
              })}
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
  return (
    <FlatList
      data={[1]} // Single item
      renderItem={() => renderContent()}
      keyExtractor={() => "key"}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    width: "100%",
    padding: 10,
    paddingBottom: 50, // Add some bottom padding
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
    marginBottom: 16,
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
