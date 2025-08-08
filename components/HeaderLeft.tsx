import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function HeaderLeft() {
  const navigation = useNavigation();

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
      >
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name="menu" size={25} />
        </TouchableOpacity>

        <Image
          source={require("../assets/logo/logo.png")}
          style={{ width: 40, height: 40, marginLeft: 10 }}
          resizeMode="contain"
        />
      </View>
      <View className="flex flex-row ml-2">
        <Text style={{ color: "#1F44FF", fontSize: 16 }}>NEURO</Text>
        <Text style={{ color: "#CC3023", fontSize: 16 }}>POINT</Text>
      </View>
    </View>
  );
}
