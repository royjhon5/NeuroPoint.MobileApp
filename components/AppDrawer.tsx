// Adjust the path if necessary
import Dashboard from "@/app/dashboard";
import HomeScreen from "@/app/index"; // Adjust the path if necessary
import CustomDrawerContent from "@/components/CustomDrawerContent";
import HeaderLeft from "@/components/HeaderLeft";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function AppDrawerLayout() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: () => null,
        headerLeft: () => <HeaderLeft />,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => <Ionicons name="home-outline" size={20} />,
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: () => (
            <MaterialIcons name="dashboard" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
