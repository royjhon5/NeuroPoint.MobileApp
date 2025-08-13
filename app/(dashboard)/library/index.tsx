import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Card,
  Modal,
  Portal,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";
import { WebView } from "react-native-webview";
import useGetEbookByPackage from "../../../libs/hooks/useGetEbook";
import useGetHandOutByPackage from "../../../libs/hooks/useGetHandout";
import useGetVideoByPackage from "../../../libs/hooks/useGetVideoByPackage";
export default function LibraryComponent() {
  const { videopackagedata } = useGetVideoByPackage(2);
  const { ebookbypackage } = useGetEbookByPackage(2);
  const { handoutbypackage } = useGetHandOutByPackage(2);
  const [value, setValue] = useState("VIDEOS");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | {
    url: string;
    type: string;
  }>(null);

  const handleCardPress = (item: any) => {
    setSelectedItem({ url: item.url, type: item.type });
    if (item.type === "video") {
      setVideoSource(item.url); // update source so player re-inits
    }
    setVisible(true);
  };

  const screenHeight = Dimensions.get("window").height;
  const [searchQuery, setSearchQuery] = useState("");
  const getFilteredData = () => {
    const rawDataMap: Record<string, any[]> = {
      VIDEOS: Array.isArray(videopackagedata) ? videopackagedata : [],
      "E-BOOK": Array.isArray(ebookbypackage) ? ebookbypackage : [],
      HANDOUTS: Array.isArray(handoutbypackage) ? handoutbypackage : [],
    };

    const selectedRawData = rawDataMap[value] ?? [];

    // Normalize structure
    const normalizedData = selectedRawData.map((item) => {
      if (value === "VIDEOS") {
        return {
          id: item.id,
          name: item.fileName,
          thumbnails: item.thumbnailUrl,
          url: item.videoUrl,
          type: "video",
        };
      } else {
        return {
          id: item.id,
          name: item.fileName,
          thumbnail: item.thumbnail,
          url: item.filePath,
          type: value === "E-BOOK" ? "ebook" : "handout",
        };
      }
    });

    return normalizedData.filter((item) =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredData = getFilteredData();
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const player = useVideoPlayer(videoSource ?? "", (player) => {
    player.loop = true;
    player.play();
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.courseTitle}>
          {value}
        </Text>
        <TextInput
          mode="outlined"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          right={<TextInput.Icon icon="magnify" />}
          placeholder="Search"
          style={{ height: 40 }}
        />
        <SegmentedButtons
          style={styles.segmentedBtns}
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "VIDEOS",
              label: "VIDEOS",
            },
            {
              value: "E-BOOK",
              label: "E-BOOK",
            },
            { value: "HANDOUTS", label: "HANDOUTS" },
          ]}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.container}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Card
              key={item.id}
              style={styles.cardContainer}
              onPress={() => handleCardPress(item)}
            >
              <Card.Cover source={{ uri: item.thumbnails || item.thumbnail }} />
              <Card.Content>
                <Text variant="titleMedium">{item.name}</Text>
                <Text variant="bodySmall">{item.type.toUpperCase()}</Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <View style={styles.noCoursesContainer}>
            <Text variant="bodyLarge" style={styles.noCoursesText}>
              No Content Available
            </Text>
          </View>
        )}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => {
              setVisible(false);
              setSelectedItem(null);
              setIsLoading(true);
              setVideoSource(null);
            }}
            contentContainerStyle={{
              backgroundColor: "white",
              height: screenHeight * 0.7,
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {isLoading && (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white", // optional if you want a white loader bg
                  zIndex: 2,
                }}
              >
                <ActivityIndicator animating={true} size="large" />
              </View>
            )}

            {selectedItem?.type === "video" && player && (
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
            )}

            {(selectedItem?.type === "ebook" ||
              selectedItem?.type === "handout") && (
              <WebView
                source={{
                  uri: `https://docs.google.com/viewer?url=${encodeURIComponent(
                    selectedItem.url
                  )}&embedded=true`,
                }}
                originWhitelist={["*"]}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                style={{
                  flex: 1,
                  opacity: isLoading ? 0 : 1,
                }}
              />
            )}
          </Modal>
        </Portal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    width: "100%",
    padding: 10,
    paddingBottom: 0,
  },
  courseTitle: {
    marginBottom: 5,
  },
  cardContainer: {
    padding: 5,
    marginTop: 10,
  },
  cardContainerView: {
    padding: 15,
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
  segmentedBtns: {
    marginTop: 10,
  },
  video: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});
