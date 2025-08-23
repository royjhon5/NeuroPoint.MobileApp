import UploadPaymentDialog from "@/app/(auth)/register/diaglog/UploadPaymentDialog";
import { PackageTypeDTO } from "@/types/DTO/PackageTypeDTO";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "react-native-paper";

type ReviewSignUpProps = {
  isLoading: boolean;
  handlePaymentReceiptChange: (file: File) => void;
  onBack?: () => void;
};

const ReviewSignUp = (props: ReviewSignUpProps) => {
  const [uploadPaymentDialog, setUploadPaymentDialog] = useState(false);
  const { formData } = useLocalSearchParams();
  const userDetails = JSON.parse(formData as string) as {
    firstName: string;
    lastName: string;
    packageType: PackageTypeDTO;
  };

  const plan = userDetails.packageType;

  if (!plan) return null;

  return (
    <View className="w-full h-full bg-white p-6">
      <View className="flex flex-col shadow-xl rounded-xl bg-white">
        <View className="p-5 flex rounded-tl-xl rounded-tr-xl flex-row items-center justify-between bg-[#1f44ff]">
          <Text className="text-white text-2xl">{plan.name}</Text>
          <View className="flex flex-row items-center">
            {[...Array(5)].map((_, i) => (
              <MaterialIcons key={i} name="star" size={18} color="yellow" />
            ))}
          </View>
        </View>
        <Text className="text-2xl font-bold text-black text-center p-4">
          {userDetails.firstName} {userDetails.lastName}
        </Text>
        <View className="px-5 sm:px-6 py-6 sm:py-8">
          <View className="mb-5 sm:mb-6"></View>
          <View className="flex">
            <Text className="bg-[#1F44FF] text-white font-bold text-lg sm:text-2xl py-2.5 sm:py-3 px-6 sm:px-8 rounded-l-full flex ml-auto mb-2 -mr-4 sm:-mr-6">
              {plan.discountPercentage}% Off
            </Text>
          </View>
          <View className="space-y-1 flex flex-col">
            <Text className="text-[#CC3023] line-through text-base sm:text-lg text-start">
              ₱{Number(plan.slashedPrice)}
            </Text>
            <View className="flex flex-row items-center gap-2">
              <Text className="text-5xl font-bold text-[#1F44FF]">
                ₱{plan.price}
              </Text>
              <Text className="text-sm">Monthly</Text>
            </View>
            {plan.features?.map((feature: any, idx: any) => (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <MaterialCommunityIcons
                  name="circle"
                  size={12}
                  color="#1F44FF"
                />
                <Text style={{ marginLeft: 8, color: "#000" }}>
                  {feature.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View className="p-2">
          <Button
            mode="contained"
            disabled={props.isLoading}
            onPress={() => setUploadPaymentDialog(true)}
            buttonColor="blue"
            style={{ borderRadius: 12, marginBottom: 8 }}
          >
            {props.isLoading ? (
              <ActivityIndicator animating color="white" />
            ) : (
              "Confirm Package"
            )}
          </Button>
        </View>
        <UploadPaymentDialog
          plan={plan as PackageTypeDTO}
          open={uploadPaymentDialog}
          userDetails={userDetails}
          handleClose={() => {
            setUploadPaymentDialog(false);
          }}
        />
      </View>
    </View>
  );
};

export default ReviewSignUp;
