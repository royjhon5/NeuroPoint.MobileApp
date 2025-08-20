import LeaderboardPage from "@/app/(dashboard)/leaderboard/LeaderboardPage";
import LibraryComponent from "@/app/(dashboard)/library";
import MyCourse from "@/app/(dashboard)/my-couses/myCourse";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  BottomNavigation,
  Icon,
  Provider,
} from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type MyRoute = {
  key: string;
  title: string;
  icon: string;
};
export default function Dashboard() {
  const [index, setIndex] = useState(0);
  const { isAuthenticated, isAuthLoading } = useAuth();
  const router = useRouter();
  const inset = useSafeAreaInsets();

  const routes: MyRoute[] = [
    { key: "mycourses", title: "My Courses", icon: "view-agenda" },
    { key: "library", title: "Library", icon: "library" },
    { key: "leaderboard", title: "Leaderboard", icon: "seal-variant" },
  ];

  const renderScene = ({ route }: { route: MyRoute }) => {
    switch (route.key) {
      case "mycourses":
        return <MyCourse />;
      case "library":
        return <LibraryComponent />;
      case "leaderboard":
        return <LeaderboardPage />;
      default:
        return null;
    }
  };
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

  return (
    <Provider>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {renderScene({ route: routes[index] })}
        <BottomNavigation.Bar
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: inset.bottom,
            height: 70,
          }}
          navigationState={{ index, routes }}
          onTabPress={({ route }: { route: MyRoute }) => {
            const newIndex = routes.findIndex((r) => r.key === route.key);
            if (newIndex !== -1) {
              setIndex(newIndex);
            }
          }}
          renderIcon={({ route, color }: { route: MyRoute; color: string }) => (
            <Icon source={route.icon} size={24} color={color} />
          )}
          getLabelText={({ route }: { route: MyRoute }) => route.title}
        />
      </View>
    </Provider>
  );
}
