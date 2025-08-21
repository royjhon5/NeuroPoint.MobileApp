import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, Card, Icon, TextInput } from "react-native-paper";
import useGetPublished from "../../../libs/hooks/useGetPublished";

export default function CoursesComponent() {
  const { publisheddata } = useGetPublished();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const filteredCourses = (publisheddata ?? []).filter((published: any) =>
    published.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex flex-col items center p-3  w-full h-full bg-[#FFFFFF]">
      <View style={styles.container}>
        <Text className="text-3xl mb-2">Courses</Text>
        <TextInput
          mode="outlined"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          right={<TextInput.Icon icon="magnify" />}
          placeholder="Search"
          style={{ height: 40 }}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 180 }}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((published: any) => (
              <Card
                key={published.id}
                style={styles.cardContainer}
                onPress={() =>
                  router.push({
                    pathname: "/(dashboard)/course-overview",
                    params: { id: published.id },
                  })
                }
              >
                <Card.Cover source={{ uri: published.thumbnailUrl }} />
                <Card.Content>
                  <View style={styles.cardContainerView}>
                    <Text className="font-bold text-2xl">{published.name}</Text>
                  </View>
                  <View style={styles.cardContainerView}>
                    <View style={styles.viewContainer}>
                      <Icon source="school" size={20} />
                      <Text>Total Lesson:</Text>
                      <Text>{published.totalLesson}</Text>
                    </View>
                    <View style={styles.viewContainer}>
                      <Icon source="book-open-variant" size={20} />
                      <Text>Total Topics:</Text>
                      <Text>{published.totalTopics}</Text>
                    </View>
                    <View style={styles.viewContainer}>
                      <Badge style={styles.badgeStyle} size={28}>
                        Paid
                      </Badge>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))
          ) : (
            <View style={styles.noCoursesContainer}>
              <Text style={styles.noCoursesText}>No Courses Available</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    width: "100%",
    bottom: 0, // Add some bottom padding
  },
  courseTitle: {
    marginBottom: 5,
  },
  cardContainer: {
    padding: 0,
    marginTop: 10,
  },
  cardContainerView: {
    padding: 5,
  },
  viewContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  textStyle: {
    marginLeft: 5,
  },
  badgeStyle: {
    borderRadius: 4,
    marginTop: 15,
  },
  noCoursesContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  noCoursesText: {
    color: "gray",
  },
});
