import { Image, Text, View } from "react-native";

export default function AllrightsReserve() {
  return (
    <View
      className="p-5 flex flex-col justift-center items-center"
      style={{ marginTop: 30 }}
    >
      <View className="flex flex-row items-center mb-4">
        <Image
          source={require("../../assets/logo/logo.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <Text style={{ color: "#1F44FF", fontSize: 20 }}>Neuro</Text>
        <Text style={{ color: "#CC3023", fontSize: 20 }}>Point</Text>
      </View>
      <Text className="text-xl">©NEUROPOINT | ALL RIGHTS RESERVED</Text>
      <Text>POWERED BY - REPOINT SOLUTIONS INC.</Text>
    </View>
  );
}
