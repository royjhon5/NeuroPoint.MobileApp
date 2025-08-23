import usePackageTypes from "@/libs/hooks/usePackageTypes";
import { PackageTypeDTO } from "@/types/DTO/PackageTypeDTO";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, IconButton } from "react-native-paper";

type ReviewSignUpProps = {
  onBack?: () => void;
  onNext?: () => void;
  onSelectPackageType: (type: number) => void;
  currentPackage: number;
  packageConfigList: PackageTypeDTO[];
};

const PackageSelection = (props: ReviewSignUpProps) => {
  const scrollRef = useRef<ScrollView>(null);
  const { packagedata } = usePackageTypes();
  const router = useRouter();
  const { formData } = useLocalSearchParams();
  const userDetails = JSON.parse(formData as string);

  const scroll = (offset: number) => {
    scrollRef.current?.scrollTo({
      x: offset,
      animated: true,
    });
  };

  const handleChoosePlan = (plan: PackageTypeDTO) => {
    router.push({
      pathname: "/(auth)/register/ReviewAndSignup",
      params: {
        formData: JSON.stringify({
          ...userDetails,
          packageType: plan, // full typed object
        }),
      },
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Title */}
      <Text
        className="text-4xl font-bold"
        style={{
          textAlign: "center",
          marginVertical: 20,
          fontWeight: "700",
          color: "#0241BE",
        }}
      >
        Select Your Package
      </Text>

      {/* Scrollable Packages */}
      <View
        className="w-full"
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <IconButton
          icon="chevron-left"
          mode="contained"
          onPress={() => scroll(-350)}
          style={styles.arrowButton}
          containerColor="#00327C"
          iconColor="#fff"
        />

        <ScrollView
          horizontal
          ref={scrollRef}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
        >
          {(packagedata ?? []).map((plan) => (
            <View key={plan.id} style={styles.card} className="shadow-xl">
              {/* Header */}
              <View className="p-5 flex flex-row items-center justify-between bg-[#1f44ff]">
                <Text className="text-white text-2xl">{plan.name}</Text>
                <View className="flex flex-row items-center">
                  {[...Array(5)].map((_, i) => (
                    <MaterialIcons
                      key={i}
                      name="star"
                      size={18}
                      color="yellow"
                    />
                  ))}
                </View>
              </View>
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
                  onPress={() => handleChoosePlan(plan)}
                  style={{ borderRadius: 12, backgroundColor: "blue" }}
                  contentStyle={{ paddingVertical: 6 }}
                >
                  Choose Plan
                </Button>
              </View>
            </View>
          ))}
        </ScrollView>

        <IconButton
          icon="chevron-right"
          mode="contained"
          onPress={() => scroll(350)}
          style={styles.arrowButton}
          containerColor="#00327C"
          iconColor="#fff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginHorizontal: 10,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#00327C",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    alignItems: "center",
  },
  arrowButton: {
    borderRadius: 50,
    marginHorizontal: 1,
    height: 25,
    width: 25,
  },
});

export default PackageSelection;
