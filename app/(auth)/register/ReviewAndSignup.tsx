import UploadPaymentDialog from "@/app/(auth)/register/diaglog/UploadPaymentDialog";
import { PackageTypeDTO } from "@/types/DTO/PackageTypeDTO";
import { numberWithCommas } from "@/utils/formatting";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  Icon,
  Text,
} from "react-native-paper";

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
      <Card style={styles.card} mode="elevated">
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}></View>
          <View style={styles.starsRow}>
            {[...Array(5)].map((_, i) => (
              <Icon key={i} source="star" size={20} color="yellow" />
            ))}
          </View>
        </View>

        {/* Name */}
        <Text variant="headlineMedium" style={styles.name}>
          {userDetails.firstName} {userDetails.lastName}
        </Text>

        {/* Package name */}
        <View style={styles.packageRow}>
          <Icon source="star" size={28} color="white" />
          <Text variant="titleLarge" style={styles.packageName}>
            {plan.name} Package
          </Text>
        </View>

        <Card.Content style={{ paddingTop: 16 }}>
          {/* Price */}
          <Text variant="headlineLarge" style={styles.price}>
            ₱{numberWithCommas(plan.price)}
          </Text>

          {/* Slashed Price */}
          {plan.slashedPrice && (
            <View style={styles.slashedPriceContainer}>
              <Text style={styles.slashedPrice}>
                ₱{numberWithCommas(Number(plan.slashedPrice))}
              </Text>
              <View style={styles.slashedLine} />
            </View>
          )}

          <Divider style={{ marginVertical: 12 }} />

          {/* Description */}
          <Text variant="bodyMedium" style={styles.description}>
            {plan.description}
          </Text>

          {/* Features */}
          <View style={{ marginVertical: 12 }}>
            {plan.features?.map((feature, idx) => (
              <View key={feature.featureId || idx} style={styles.featureRow}>
                <Icon source="check" size={20} color="#4CAF50" />
                <Text variant="bodySmall" style={styles.featureText}>
                  {feature.name}
                </Text>
              </View>
            ))}
          </View>

          {/* Confirm Button */}
          <Button
            mode="contained"
            disabled={props.isLoading}
            onPress={() => setUploadPaymentDialog(true)}
            buttonColor="red"
            style={{ borderRadius: 12, marginBottom: 8 }}
          >
            {props.isLoading ? (
              <ActivityIndicator animating color="white" />
            ) : (
              "Confirm Package"
            )}
          </Button>
          <UploadPaymentDialog
            plan={plan as PackageTypeDTO}
            open={uploadPaymentDialog}
            userDetails={userDetails}
            handleClose={() => {
              setUploadPaymentDialog(false);
            }}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f9fc",
  },
  card: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#00327C",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    fontWeight: "700",
    marginVertical: 8,
    color: "#00327C",
  },
  packageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#00327C",
    paddingVertical: 8,
  },
  packageName: {
    color: "white",
    fontWeight: "700",
  },
  price: {
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  slashedPriceContainer: {
    alignItems: "center",
    position: "relative",
    marginBottom: 8,
  },
  slashedPrice: {
    color: "red",
    textDecorationLine: "line-through",
  },
  slashedLine: {
    position: "absolute",
    height: 1,
    backgroundColor: "red",
    width: "100%",
    top: "50%",
  },
  description: {
    textAlign: "center",
    color: "#666",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  featureText: {
    marginLeft: 8,
    color: "#000",
  },
});

export default ReviewSignUp;
