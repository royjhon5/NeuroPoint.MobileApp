import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const CustomDrawerContent: React.FC = (props) => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("../assets/logo/logo.png")} // Adjust path
        style={styles.logo}
      />
      <View className="flex flex-row">
        <Text style={{ color: "#1F44FF", fontSize: 25 }}>NEURO</Text>
        <Text style={{ color: "#CC3023", fontSize: 25 }}>POINT</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    gap: 4,
    backgroundColor: "#fff",
  },
  logo: {
    width: 50,
    height: 40,
    resizeMode: "contain",
  },
});

export default CustomDrawerContent;
