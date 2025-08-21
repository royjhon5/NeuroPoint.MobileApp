import { useState } from "react";
import { View } from "react-native";
import { BottomNavigation, Icon, Provider } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";
type MyRoute = {
  key: string;
  title: string;
  icon: string;
};

export default function Account() {
  const [index, setIndex] = useState<number>(0);
  const inset = useSafeAreaInsets();
  const routes: MyRoute[] = [
    { key: "myprofile", title: "Profile", icon: "account" },
    { key: "changepassword", title: "Change Password", icon: "key" },
  ];

  const renderScene = ({ route }: { route: MyRoute }) => {
    switch (route.key) {
      case "myprofile":
        return <Profile />;
      case "changepassword":
        return <ChangePassword />;
      default:
        return null;
    }
  };

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
            backgroundColor: "white",
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
