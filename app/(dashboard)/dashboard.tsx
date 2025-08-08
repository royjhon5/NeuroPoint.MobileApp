import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function Dashboard() {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading) {
    return (
      <View className="p-5 flex items-center justify-center">
        <ActivityIndicator animating={isAuthLoading} />
      </View>
    );
  }

  return (
    <>
      <View>
        <Text>Hello World</Text>
      </View>
    </>
  );
}
