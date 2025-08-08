// components/VideoSection.tsx
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";
const videoSource =
  "https://www.neuropoint.io/assets/nuerupointvideo-CNeGow64.mp4";
const VideoSection = () => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });
  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  video: {
    width: 350,
    height: 275,
  },
});

export default VideoSection;
