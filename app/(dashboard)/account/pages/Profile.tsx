import usePackageTypes from "@/libs/hooks/usePackageTypes";
import usePaymentsByUserId from "@/libs/hooks/usePaymentsByUserId";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Card,
  Dialog,
  Divider,
  HelperText,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import UpgradeDialog from "../diaglog/UpgradeDialog";
// import Payment from "./Payment"; // Your component

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
  const theme = useTheme();
  const [userData, setUserData] = useState<Users | null>(null);
  const handleProfilePicChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("Selected Image:", uri);
    }
  };

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
  const { packagedata } = usePackageTypes(Number(userData?.branchId));
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
        slashedPrice: p.slashedPrice ? Number(p.slashedPrice) : undefined,
      }));

    const indexOfUserPackage = availablePackages.findIndex(
      (prop) => prop.id === userData?.packageTypeId
    );

    if (indexOfUserPackage !== -1) {
      return availablePackages.slice(indexOfUserPackage + 1);
    }

    return availablePackages;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <View style={styles.row}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.headerBg} />
            <View style={styles.profileContainer}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={
                    userData?.isProfileApproved && userData?.isProfileApproved
                      ? { uri: "fuck" }
                      : ("fuck" as ImageSourcePropType)
                  }
                  style={styles.avatar}
                />
                <TouchableOpacity
                  onPress={handleProfilePicChange}
                  style={styles.uploadButton}
                >
                  <Text style={styles.uploadText}>📷</Text>
                </TouchableOpacity>
              </View>

              {/* Feedback */}
              {userData &&
                !userData?.isProfileApproved &&
                !userData?.profileFeedback && (
                  <HelperText type="info" style={{ marginTop: 15 }}>
                    Your profile picture is subject to approval
                  </HelperText>
                )}
              {userData &&
                !userData?.isProfileApproved &&
                userData?.profileFeedback && (
                  <HelperText type="error">
                    {userData?.profileFeedback}
                  </HelperText>
                )}

              <Text variant="titleLarge" style={styles.username}>
                {userData?.username?.toUpperCase()}
              </Text>
              <Text variant="bodyMedium" style={styles.email}>
                {userData?.email}
              </Text>

              <Divider style={{ marginVertical: 12 }} />

              <Text variant="titleMedium">
                Payment Status:{" "}
                <Text style={{ color: getPaymentColor(), fontWeight: "bold" }}>
                  {userData?.paymentStatus === PaymentStatus.Unpaid
                    ? "Unpaid"
                    : userData?.paymentStatus === PaymentStatus.Pending
                    ? "Pending"
                    : "Paid"}
                </Text>
              </Text>

              <View style={styles.packageBox}>
                <Text style={styles.packageText}>
                  {userData?.packageName} |{" "}
                  {formatPrice(Number(userData?.price))}
                </Text>
              </View>

              <View style={{ marginTop: 20 }}>
                {userData?.paymentStatus !== PaymentStatus.Paid && (
                  <Button
                    icon="upload"
                    mode="contained"
                    onPress={() => setOpenReceiptDialog(true)}
                    style={styles.button}
                  >
                    Upload Receipt
                  </Button>
                )}

                {userData?.paymentStatus === PaymentStatus.Paid &&
                  availablePlans().length > 0 && (
                    <Button
                      icon="arrow-up-bold"
                      mode="outlined"
                      disabled={hasPendingUpgrade}
                      onPress={() => setOpenUpgradeDialog(true)}
                      style={styles.button}
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
          <View style={styles.paymentSection}>{/* <Payment /> */}</View>
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
            <Text>Insert upload form here</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOpenReceiptDialog(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>

        <UpgradeDialog
          visible={openUpgradeDialog}
          onDismiss={() => setOpenUpgradeDialog(false)}
          plans={availablePlans()}
          hasPendingUpgrade={hasPendingUpgrade}
          onUpgrade={(plan) => {
            console.log("Upgrade to:", plan.name);
            // You can also close the dialog or trigger API call here
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
    marginTop: 12,
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
    marginTop: 10,
    borderRadius: 12,
  },
  dialog: {
    maxHeight: "90%",
    borderRadius: 16,
  },
});
