import useSignUp from "@/libs/hooks/useSignUp";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  Icon,
  Portal,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
type PackageType = {
  id: number;
  name: string;
  price: number;
};

type UploadReceiptOnUpgradeProps = {
  open: boolean;
  handleClose: () => void;
  plan: PackageType;
  userDetails: any;
};

const UploadPaymentDialog: React.FC<UploadReceiptOnUpgradeProps> = ({
  open,
  handleClose,
  plan,
  userDetails,
}) => {
  const theme = useTheme();
  const [image, setImage] = useState<any>(null);
  const { onSubmit, handlePaymentReceiptChange } = useSignUp();
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const imageData: any = {
        uri: asset.uri,
        type: "image/jpeg",
        name: asset.fileName || `receipt_${Date.now()}.jpg`,
      };
      setImage(imageData);
      handlePaymentReceiptChange(imageData);
    }
  };

  const handleConfirm = () => {
    onSubmit({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
      mobileNumber: userDetails.mobileNumber,
      address: userDetails.address,
      packageTypeId: plan.id,
    });
  };
  const downloadAndSaveImage = async (imageUrl: any) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required to save images!");
        return;
      }

      const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
      const fileUri = FileSystem.documentDirectory + filename;

      // Download the image
      const { uri } = await FileSystem.downloadAsync(imageUrl, fileUri);
      await MediaLibrary.saveToLibraryAsync(uri);
      alert("Image saved to gallery!");
    } catch (error) {
      console.error("Error downloading or saving image:", error);
      alert("Failed to download and save image.");
    }
  };

  return (
    <Portal>
      <Dialog visible={open} onDismiss={handleClose} style={styles.dialog}>
        <Dialog.Title>Upload Receipt</Dialog.Title>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.packageTitle}>
              Payment:
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(plan.price)}
            </Text>

            <View style={styles.instructionsSection}>
              <Text variant="titleMedium" style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold" }}>
                  Instructions for Payment:
                </Text>
              </Text>

              <View style={styles.instructionItem}>
                <Icon source="qrcode" color={theme.colors.primary} size={20} />
                <Text style={styles.instructionText}>
                  1. Scan the QR code or manually enter the account number
                  provided below.
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Icon
                  source="credit-card-check"
                  color={theme.colors.primary}
                  size={20}
                />
                <Text style={styles.instructionText}>
                  2. Enter the payment amount.
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Icon
                  source="monitor-screenshot"
                  color={theme.colors.secondary}
                  size={20}
                />
                <Text style={styles.instructionText}>
                  3. Save or take a screenshot of the payment receipt.
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <Icon
                  source="cloud-upload"
                  color={theme.colors.onSurfaceVariant}
                  size={20}
                />
                <Text style={styles.instructionText}>
                  4. Upload the receipt then upgrade.
                </Text>
              </View>
            </View>

            {/* Replace this with your React Native file uploader */}
            <View
              className="flex flex-col items-center"
              style={{ marginVertical: 10 }}
            >
              {/* <FileUploader onSelectFile={handlePaymentReceiptChange} /> */}
              <Button className="w-full" mode="outlined" onPress={pickImage}>
                Upload Receipt
              </Button>

              {image && (
                <Image
                  className="w-full"
                  source={{ uri: image.uri }}
                  style={{ width: 250, height: 250, marginVertical: 10 }}
                />
              )}
            </View>

            {/* Replace this with your actual Payment component */}
            <View className="rounded-xl" style={styles.paymentSection}>
              <Text className="text-white flex text-center text-2xl">
                Payment Options
              </Text>
              <Text className="text-white flex text-center text-1xl">
                Click the image to download the QR code
              </Text>
              <View className="flex flex-row gap-5 mt-5 items-center justify-center">
                <TouchableRipple
                  onPress={downloadAndSaveImage.bind(
                    null,
                    "https://www.neuropoint.io/assets/bpi-qr-Du2OS9N9.png"
                  )}
                  rippleColor="rgba(0, 0, 0, .32)"
                >
                  <Image
                    source={require("../../../../assets/bpi.jpg")}
                    style={{ width: 120, height: 120, borderRadius: 12 }}
                  />
                </TouchableRipple>

                <TouchableRipple
                  onPress={downloadAndSaveImage.bind(
                    null,
                    "https://www.neuropoint.io/assets/gcash-qr-ILfuFeVR.png"
                  )}
                  rippleColor="rgba(0, 0, 0, .32)"
                >
                  <Image
                    source={require("../../../../assets/gcash.jpg")}
                    style={{ width: 120, height: 120, borderRadius: 12 }}
                  />
                </TouchableRipple>
              </View>
            </View>
          </ScrollView>
        </Dialog.ScrollArea>

        <Dialog.Actions style={styles.actions}>
          <Button
            onPress={() => {
              handleClose();
              setImage(null);
            }}
            textColor={theme.colors.primary}
          >
            Cancel
          </Button>
          <Button mode="contained" onPress={handleConfirm}>
            Enroll
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default UploadPaymentDialog;

const styles = StyleSheet.create({
  dialog: {
    maxHeight: "90%",
    borderRadius: 16,
  },
  scrollContent: {
    padding: 16,
    gap: 10,
  },
  paymentSection: {
    flex: 1,
    backgroundColor: "#015bef",
    padding: 16,
    justifyContent: "center",
  },
  packageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#0241BE",
    color: "white",
    paddingVertical: 8,
    borderRadius: 6,
  },
  instructionsSection: {
    marginTop: 16,
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  instructionText: {
    flex: 1,
  },
  paymentBox: {
    marginTop: 20,
    backgroundColor: "#015bef",
    padding: 16,
    borderRadius: 8,
  },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});
