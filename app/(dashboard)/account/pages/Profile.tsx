import usePackageTypeses from "@/libs/hooks/usePackageTypeses";
import usePaymentsByUserId from "@/libs/hooks/usePaymentsByUserId";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Card,
  Dialog,
  Divider,
  HelperText,
  Icon,
  Portal,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import UpgradeDialog from "../diaglog/UpgradeDialog";
// import Payment from "./Payment"; // Your component

import { RNFile, uploadPaymentReceipt } from "@/libs/api/services/payment.api";
import { uploadProfile } from "@/libs/api/services/user.api";
import useUserDetails from "@/libs/hooks/useUserDetails";
import { useQueryClient } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { requestCameraPermissionsAsync } from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import Toast from "react-native-toast-message";
// Enum for Payment Status
export enum PaymentStatus {
  Unpaid = 0,
  Pending = 1,
  Paid = 2,
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

type Users = {
  userId: string;
  username: string;
  role: string;
  email: string;
  branchId: number;
  packageTypeId: number;
  paymentStatus: number;
  profileFeedback: string;
  isProfileApproved: boolean;
  packageName: string;
  price: number;
};
const Profile: React.FC = () => {
  const [openReceiptDialog, setOpenReceiptDialog] = useState(false);
  const [openUpgradeDialog, setOpenUpgradeDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState<any>(null);
  const { getUserDetails } = useUserDetails();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [userData, setUserData] = useState<Users | null>(null);
  const getPaymentColor = (): string => {
    switch (userData?.paymentStatus) {
      case PaymentStatus.Unpaid:
        return theme.colors.error;
      case PaymentStatus.Pending:
        return theme.colors.secondary ?? "#FFA000";
      case PaymentStatus.Paid:
        return theme.colors.primary;
      default:
        return "#000";
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        const user = JSON.parse(value);
        return user;
      }
    } catch (e) {
      console.error("Failed to fetch data from storage", e);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getData();
      if (user) {
        setUserData(user);
      }
    };

    fetchUser();
  }, []);

  const { paymentsByUserId } = usePaymentsByUserId(userData?.userId as string);
  const { packagedata } = usePackageTypeses(Number(userData?.branchId));
  const hasPendingUpgrade = paymentsByUserId?.find(
    (x) => x.status === PaymentStatus.Pending
  )
    ? true
    : false;

  const availablePlans = () => {
    const availablePackages = [...packagedata]
      .sort((a, b) => a.price - b.price)
      .map((p) => ({
        ...p,
        slashedPrice:
          p.slashedPrice !== null && p.slashedPrice !== undefined
            ? Number(p.slashedPrice)
            : 0,
      }));

    const indexOfUserPackage = availablePackages.findIndex(
      (prop) => prop.id === userData?.packageTypeId
    );

    if (indexOfUserPackage !== -1) {
      return availablePackages.slice(indexOfUserPackage + 1);
    }

    return availablePackages;
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

  const uploadProfilePicture = async (file: RNFile) => {
    try {
      const response = await uploadProfile({
        file: file,
      });

      if (response.isSuccess) {
        Toast.show({
          type: "success",
          text2: "Uploaded Profile success subject for approval.",
        });
        queryClient.invalidateQueries({ queryKey: ["getuserdetauls"] });
      } else {
        Toast.show({
          type: "error",
          text2: "Upload receipt failed. Please login and upload again.",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text2: "Error uploading payment receipt. Please ",
      });
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermissionsAsync();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const imageData: any = {
        uri: asset.uri,
        type: "image/jpeg",
        name: asset.fileName || `receipt_${Date.now()}.jpg`,
      };
      uploadProfilePicture(imageData);
    }
  };

  const openImageLibrary = async () => {
    const hasPermission = await MediaLibrary.requestPermissionsAsync();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const imageData: any = {
        uri: asset.uri,
        type: "image/jpeg",
        name: asset.fileName || `receipt_${Date.now()}.jpg`,
      };
      uploadProfilePicture(imageData);
    }
  };

  const showImageSourceOptions = () => {
    Alert.alert(
      "Add Photo",
      "Choose how you'd like to add a photo",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Take Photo", onPress: openCamera },
        { text: "Choose from Library", onPress: openImageLibrary },
      ],
      { cancelable: true }
    );
  };

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
    }
  };

  const closeUploadReceiptDialog = () => {
    setOpenReceiptDialog(false);
    setImage(null);
  };

  const uploadReceiptCommand = async () => {
    setLoading(true);
    try {
      const response = await uploadPaymentReceipt({
        file: image,
        userId: getUserDetails?.id as string,
        studentPackageId: getUserDetails?.currentPackage
          .studentPackageTypeId as number,
      });
      if (response.isSuccess) {
        Toast.show({
          type: "success",
          text2: "Uploaded Profile success subject for approval.",
        });
        queryClient.invalidateQueries({ queryKey: ["getuserdetauls"] });
        setLoading(false);
      } else {
        Toast.show({
          type: "error",
          text2: "Upload receipt failed. Please login and upload again.",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text2: "Error uploading payment receipt. Please ",
      });
    } finally {
      setLoading(false);
      closeUploadReceiptDialog();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <View style={styles.row}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.headerBg} />
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={showImageSourceOptions}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={
                      getUserDetails?.isProfileApproved &&
                      getUserDetails?.isProfileApproved
                        ? { uri: getUserDetails?.profile || "" }
                        : ("test" as ImageSourcePropType)
                    }
                    style={styles.avatar}
                  />

                  <Text style={styles.uploadText}>📷</Text>
                </View>
              </TouchableOpacity>
              {/* Feedback */}
              {getUserDetails?.profile &&
                !getUserDetails?.isProfileApproved &&
                !getUserDetails?.profileFeedback && (
                  <View className="p-2 bg-blue-200 rounded-xl mt-2 flex flex-row items-center gap-2">
                    <Icon
                      source="information-variant-circle-outline"
                      size={18}
                    />
                    <Text>Your profile picture is subject to approval</Text>
                  </View>
                )}
              {getUserDetails?.profile &&
                !getUserDetails?.isProfileApproved &&
                getUserDetails?.profileFeedback && (
                  <HelperText type="error">
                    {getUserDetails?.profileFeedback}
                  </HelperText>
                )}

              <Text className="text-3xl font-bold mt-5">
                {userData?.username?.toUpperCase()}
              </Text>
              <Text style={styles.email}>{getUserDetails?.email}</Text>

              <View className="mb-4 mt-4 w-full">
                <Divider />
              </View>

              <Text>
                Payment Status:{" "}
                <Text style={{ color: getPaymentColor(), fontWeight: "bold" }}>
                  {getUserDetails?.currentPackage.paymentStatus ===
                  PaymentStatus.Unpaid
                    ? "Unpaid"
                    : getUserDetails?.currentPackage.paymentStatus ===
                      PaymentStatus.Pending
                    ? "Pending"
                    : "Paid"}
                </Text>
              </Text>

              <View style={styles.packageBox}>
                <Text style={styles.packageText}>
                  {getUserDetails?.currentPackage.packageName} |{" "}
                  {formatPrice(Number(userData?.price))}
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                {getUserDetails?.currentPackage.paymentStatus !==
                  PaymentStatus.Paid && (
                  <Button
                    icon="upload"
                    mode="contained"
                    onPress={() => setOpenReceiptDialog(true)}
                    style={styles.button}
                  >
                    Upload Receipt
                  </Button>
                )}

                {getUserDetails?.currentPackage.paymentStatus ===
                  PaymentStatus.Paid &&
                  availablePlans().length > 0 && (
                    <Button
                      icon="arrow-up-bold"
                      mode="contained"
                      disabled={hasPendingUpgrade}
                      onPress={() => setOpenUpgradeDialog(true)}
                      buttonColor="blue"
                    >
                      {hasPendingUpgrade
                        ? "Pending Upgrade"
                        : "Upgrade Package"}
                    </Button>
                  )}
              </View>
            </View>
          </View>

          {/* Payment Info */}
          <View style={styles.paymentSection}>
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
        </View>
      </Card>

      {/* Upload Receipt Dialog */}
      <Portal>
        <Dialog
          visible={openReceiptDialog}
          onDismiss={() => setOpenReceiptDialog(false)}
        >
          <Dialog.Title>Upload Receipt</Dialog.Title>
          <Dialog.Content>
            <View className="p-10 border border-dashed flex flex-col items-center">
              {image && (
                <Image
                  className="w-full"
                  source={{ uri: image.uri }}
                  style={{ width: 250, height: 250, marginVertical: 10 }}
                />
              )}
              <Button mode="contained" buttonColor="blue" onPress={pickImage}>
                {image ? "Change Receipt" : "Upload Receipt"}
              </Button>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <View className="flex flex-row gap-5 items-center justify-between w-full">
              <Button onPress={closeUploadReceiptDialog}>Cancel</Button>
              <Button
                mode="contained"
                buttonColor="blue"
                disabled={!image}
                onPress={uploadReceiptCommand}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </View>
          </Dialog.Actions>
        </Dialog>

        <UpgradeDialog
          visible={openUpgradeDialog}
          onDismiss={() => setOpenUpgradeDialog(false)}
          plans={availablePlans()}
          hasPendingUpgrade={hasPendingUpgrade}
          onUpgrade={(plan) => {
            setOpenUpgradeDialog(false);
          }}
        />
      </Portal>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 15,
  },
  card: {
    borderRadius: 24,
    elevation: 6,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  profileSection: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#fff",
    paddingBottom: 32,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  headerBg: {
    height: 120,
    backgroundColor: "#0241BE",
  },
  profileContainer: {
    paddingHorizontal: 24,
    marginTop: -60,
    alignItems: "center",
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    overflow: "hidden",
    position: "relative",
    elevation: 4,
    backgroundColor: "#fff",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    resizeMode: "cover",
  },
  uploadButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ffffffcc",
    borderRadius: 12,
    padding: 4,
  },
  uploadText: {
    fontSize: 16,
  },
  username: {
    marginTop: 16,
    fontWeight: "bold",
  },
  email: {
    color: "#666",
  },
  packageBox: {
    marginTop: 7,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#E3F2FD",
  },
  packageText: {
    fontWeight: "bold",
    color: "#1976D2",
  },
  paymentSection: {
    flex: 1,
    backgroundColor: "#015bef",
    padding: 16,
    justifyContent: "center",
  },
  button: {
    marginTop: 7,
    borderRadius: 12,
    backgroundColor: "blue",
    color: "white",
  },
  dialog: {
    maxHeight: "90%",
    borderRadius: 16,
  },
});
