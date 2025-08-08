import WhyComponent from "@/app/sections/WhySection";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { TabView } from "react-native-tab-view";

export default function Dashboard() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);
  const { isAuthenticated, isAuthLoading } = useAuth();
  const router = useRouter();

  const routes = useMemo(
    () => [
      { key: "first", title: "My Courses" },
      { key: "second", title: "Library" },
      { key: "third", title: "Leaderboard" },
    ],
    []
  );

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading) {
    return (
      <View className="p-5 flex items-center justify-center">
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "first":
        return <WhyComponent />;
      case "second":
        return <WhyComponent />;
      case "third":
        return <WhyComponent />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      lazy
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width || 360 }}
    />
  );
}
