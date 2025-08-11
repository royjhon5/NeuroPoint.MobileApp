import { Image, Text, View } from "react-native";
import { Card } from "react-native-paper";

const OurExpertTeacher = () => {
  return (
    <View className="flex flex-col items-center p-2 mt-2">
      <Text style={{ fontSize: 23, fontWeight: "bold" }}>
        Our Expert Teacher
      </Text>
      <Card style={{ width: "100%" }}>
        <Card.Content>
          <Image
            source={{ uri: "https://www.neuropoint.io/ms-flores.jpg" }}
            style={{
              width: "100%",
              height: 400,
              borderRadius: 8,
            }}
            resizeMode="cover" // makes it fill the space nicely
          />
          <Text className="mt-2">Teacher</Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Alfenica Flores
          </Text>
        </Card.Content>
      </Card>
      <Card style={{ width: "100%", marginTop: 15 }}>
        <Card.Content>
          <Image
            source={{ uri: "https://www.neuropoint.io/mrs-elaine.jpg" }}
            style={{
              width: "100%",
              height: 400,
              borderRadius: 8,
            }}
            resizeMode="cover" // makes it fill the space nicely
          />
          <Text className="mt-2">Teacher</Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Eliane T. Monceda
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default OurExpertTeacher;
