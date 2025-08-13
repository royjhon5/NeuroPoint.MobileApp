// prettier-ignore
import AppBarComponent from "@/components/AppBar";
import DrawerWrapper from "@/components/DrawerWrapper";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Colors } from "@/constants/Colors";
import { AuthProvider } from "@/context/AuthContext";
import { DrawerProvider } from "@/context/DrawerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { Appearance, useColorScheme, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FAB, MD3LightTheme, PaperProvider } from "react-native-paper";
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
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    Appearance.setColorScheme?.("light"); // Only works on some platforms
  }, []);
  const fabStyle = useMemo<ViewStyle>(() => {
    if (pathname === "/dashboard") {
      return {
        position: "absolute",
        bottom: 75,
        right: 16,
        borderRadius: 50,
      };
    } else if (pathname === "/neuro-AI") {
      return {
        display: "none",
      };
    } else if (pathname === "/login") {
      return {
        display: "none",
      };
    } else if (pathname === "/register") {
      return {
        display: "none",
      };
    } else if (pathname.startsWith("/account")) {
      return {
        position: "absolute",
        bottom: 105,
        right: 16,
        borderRadius: 50,
      };
    }
    return {
      position: "absolute",
      bottom: 16,
      right: 16,
      borderRadius: 50,
    };
  }, [pathname]);

  if (!loaded) {
    return null;
  }

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3LightTheme, colors: Colors.light }
      : { ...MD3LightTheme, colors: Colors.light };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <StatusBar />

            <PaperProvider theme={paperTheme}>
              <ErrorBoundary>
                <DrawerProvider>
                  <DrawerWrapper>
                    <AppBarComponent />
                    <Slot />
                    <Toast />
                    <FAB
                      icon="message"
                      style={fabStyle}
                      onPress={() => {
                        router.push("/neuro-AI");
                      }}
                    />
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
