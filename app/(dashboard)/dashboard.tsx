import WhyComponent from "@/app/sections/WhySection";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { TabView } from "react-native-tab-view";

export default function Dashboard() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  // Prevent index out of bounds
  if (index >= routes.length) setIndex(0);

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "first":
        return <WhyComponent />;
      case "second":
        return <WhyComponent />;
      case "third":
        return <WhyComponent />;
      default:
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Unknown tab</Text>
          </View>
        );
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      lazy
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width > 0 ? layout.width : 360 }}
    />
  );
}
