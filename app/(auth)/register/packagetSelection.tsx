import usePackageTypes from "@/libs/hooks/usePackageTypes";
import { PackageTypeDTO } from "@/types/DTO/PackageTypeDTO";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";

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
  console.log(userDetails);

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
        variant="headlineLarge"
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <Card
              key={plan.id}
              style={styles.card}
              onPress={() => props.onSelectPackageType(plan.id)}
            >
              {/* Header */}
              <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center" }} />
                <View style={{ flexDirection: "row" }}>
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

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "white",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                {plan.name}
              </Text>

              {/* Price */}
              <View style={{ padding: 16, backgroundColor: "#fff" }}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "800",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  ₱{plan.price}
                </Text>

                {plan.slashedPrice && (
                  <Text
                    style={{
                      textAlign: "center",
                      textDecorationLine: "line-through",
                      color: "red",
                      marginBottom: 4,
                    }}
                  >
                    ₱{Number(plan.slashedPrice)}
                  </Text>
                )}

                {/* Description */}
                <Text
                  style={{
                    fontSize: 14,
                    color: "#666",
                    textAlign: "center",
                    marginVertical: 8,
                  }}
                  numberOfLines={3}
                >
                  {plan.description}
                </Text>

                {/* Get Started */}
                <Button
                  mode="contained"
                  onPress={() => handleChoosePlan(plan)}
                  style={{ borderRadius: 12, backgroundColor: "blue" }}
                  contentStyle={{ paddingVertical: 6 }}
                >
                  Choose Plan
                </Button>

                {/* Features */}
                <View style={{ marginTop: 12 }}>
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
                        name="check"
                        size={18}
                        color="#4CAF50"
                      />
                      <Text style={{ marginLeft: 8, color: "#000" }}>
                        {feature.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </Card>
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
    backgroundColor: "#00327C",
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
