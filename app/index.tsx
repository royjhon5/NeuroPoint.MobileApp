import HeroSection from "@/app/sections/HeroSection";
import VideoSection from "@/app/sections/VideoSection";
import WhyComponent from "@/app/sections/WhySection";
import { ScrollView } from "react-native-gesture-handler";

export default function LandingPage() {
  return (
    <ScrollView className="mb-10 bg-[#FFFFFF] p-safe">
      <HeroSection />
      <VideoSection />
      <WhyComponent />
    </ScrollView>
  );
}
