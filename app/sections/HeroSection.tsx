import { Image, StyleSheet } from "react-native";

const HeroSection = () => {
  return (
    <Image
      source={{
        uri: "https://www.neuropoint.io/assets/hero-DjkG3vZV.jpg",
      }}
      style={[styles.image]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    marginTop: 0,
  },
});

export default HeroSection;
