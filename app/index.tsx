import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AboutUs from "@/app/sections/AboutUs";
import AllrightsReserve from "@/app/sections/AllRightsReserve";
import HeroSection from "@/app/sections/HeroSection";
import OurExpertTeacher from "@/app/sections/OurExpertTeachers";
import OurSubject from "@/app/sections/OurSubject";
import VideoSection from "@/app/sections/VideoSection";
import WhyComponent from "@/app/sections/WhySection";

export default function LandingPage() {
  return (
    <SafeAreaView style={styles.container} className="p-safe">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroSection />
        <VideoSection />
        <WhyComponent />
        <OurSubject />
        <OurExpertTeacher />
        <AboutUs />
        <AllrightsReserve />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
