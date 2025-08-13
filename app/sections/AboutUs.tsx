import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function AboutUs() {
  return (
    <View
      className="bg-[#4C5FBE] p-5 flex flex-col gap-2"
      style={{ marginTop: 30 }}
    >
      <Text className="text-white text-xl">About Us.</Text>
      <Text className="text-white">
        Every Child Deserves to Thrive — Their Way At NeuroPoint, we believe
        learning should adapt to the child — not the other way around.
      </Text>
      <Text className="text-white text-xl mt-2">Useful Links</Text>
      <Link href={"/"} className="text-white">
        Partners
      </Link>
      <Link href={"/"} className="text-white">
        Contacts
      </Link>
      <Text className="text-white text-xl mt-2">Help?</Text>
      <Link href={"/"} className="text-white">
        FAQ
      </Link>
      <Link href={"/"} className="text-white">
        Term & conditions
      </Link>
      <Link href={"/pages/PrivacyPolicy"} className="text-white">
        Privacy Policy
      </Link>
    </View>
  );
}
