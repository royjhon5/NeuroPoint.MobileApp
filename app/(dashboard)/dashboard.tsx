import WhyComponent from "@/app/sections/WhySection";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

const renderScene = SceneMap({
  first: WhyComponent,
  second: WhyComponent,
  third: WhyComponent,
});

export default function Dashboard() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const routes = useMemo(
    () => [
      { key: "first", title: "My Courses" },
      { key: "second", title: "Library" },
      { key: "third", title: "Leaderboard" },
    ],
    []
  );

  if (!isAuthenticated) {
    router.replace("/(auth)/login");
  }

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width || 360 }}
      />
    </>
  );
}
