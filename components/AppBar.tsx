import { useAuth } from "@/context/AuthContext";
import { useDrawer } from "@/context/DrawerContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Appbar, Avatar, IconButton, Menu } from "react-native-paper";

const AppBarComponent = () => {
  const { openDrawer } = useDrawer();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      closeMenu();
      router.push("/(auth)/login");
    } else {
      router.push("/(auth)/login");
    }
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: "#e8e6eaff",
        }}
      >
        <Appbar.Content
          title={
            <View className="flex flex-row gap-1 items-center">
              <IconButton icon="menu" size={20} onPress={openDrawer} />
              <View className="flex flex-row items-center">
                <Image
                  source={require("../assets/logo/logo.png")}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
                <Text style={{ color: "#1F44FF", fontSize: 16 }}>NEURO</Text>
                <Text style={{ color: "#CC3023", fontSize: 16 }}>POINT</Text>
              </View>
            </View>
          }
        />
        <View style={styles.rightIcons}>
          {isAuthenticated ? (
            <>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <IconButton
                    icon={() => <Avatar.Icon size={24} icon="account" />}
                    onPress={openMenu}
                  />
                }
              >
                <Menu.Item
                  onPress={() => (
                    router.push("/(dashboard)/account"), closeMenu()
                  )}
                  title="Account"
                />
                <Menu.Item onPress={handleAuthAction} title="Logout" />
              </Menu>
            </>
          ) : (
            <IconButton
              mode="outlined"
              icon="login"
              size={15}
              onPress={handleAuthAction}
            />
          )}
        </View>
      </Appbar.Header>
    </>
  );
};

const styles = StyleSheet.create({
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
  },
});

export default AppBarComponent;
