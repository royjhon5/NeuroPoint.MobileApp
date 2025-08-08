// prettier-ignore
import AppBarComponent from "@/components/AppBar";
import DrawerWrapper from "@/components/DrawerWrapper";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";
import { DrawerProvider } from "@/context/DrawerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";
export const unstable_settings = {
  initialRouteName: "index",
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <PaperProvider theme={MD3LightTheme}>
              <ErrorBoundary>
                <StatusBar style="dark" />
                <DrawerProvider>
                  <DrawerWrapper>
                    <AppBarComponent />
                    <Slot />
                    <Toast />
                  </DrawerWrapper>
                </DrawerProvider>
              </ErrorBoundary>
            </PaperProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
