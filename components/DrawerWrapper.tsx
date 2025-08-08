// components/DrawerWrapper.tsx
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { useDrawer } from "@/context/DrawerContext";
import { useRouter } from "expo-router";
import React from "react";
import { DrawerLayoutAndroid, StyleSheet, View } from "react-native";
import { Divider, Text, TouchableRipple } from "react-native-paper";

const DrawerWrapper = ({ children }: { children: React.ReactNode }) => {
  const { drawerRef, closeDrawer } = useDrawer();
  const router = useRouter();

  const navigationView = () => (
    <View style={[styles.container]}>
      <CustomDrawerContent />
      <View className="mb-4">
        <Divider />
      </View>
      <TouchableRipple
        onPress={() => {
          router.navigate("/");
          closeDrawer();
        }}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <Text className="p-5" style={{ fontSize: 18 }}>
          Home
        </Text>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          router.push("/(dashboard)/dashboard");
          closeDrawer();
        }}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <Text className="p-5" style={{ fontSize: 18 }}>
          My Dashboard
        </Text>
      </TouchableRipple>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      {children}
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 20,
  },
  paragraph: { padding: 16, fontSize: 15 },
});

export default DrawerWrapper;
