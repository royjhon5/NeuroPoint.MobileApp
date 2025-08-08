import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { BaseResponseType } from "../../types/BaseResponse";
import { upgradeCurrentPackage } from "../api/services/user.api";

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
  studentPackageTypeId: number;
};
const useUpgradePackage = () => {
  const [userData, setUserData] = useState<Users | null>(null);
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
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);
  const { isSuccess, mutate } = useMutation({
    mutationFn: upgradeCurrentPackage,
    onSuccess: (res) => {
      const data = res as BaseResponseType<boolean>;
      if (data.isSuccess) {
        Toast.show({
          type: "success",
          text1: "Package successfully upgraded.",
        });
      }
    },
    onError: (res) => {
      Toast.show({
        type: "error",
        text1: `${res.message}`,
      });
    },
  });

  const upgradePackage = (packageTypeId: number) => {
    if (!paymentReceipt) {
      Toast.show({
        type: "error",
        text1: "Please upload a payment receipt.",
      });
      return;
    }
    if (window.confirm("Upgrade package?")) {
      mutate({
        studentPackageId: userData?.studentPackageTypeId as number,
        packageTypeId,
        paymentReceipt: paymentReceipt,
      });
    }
  };

  const handlePaymentReceiptChange = (file: File) => {
    setPaymentReceipt(file);
  };

  return {
    upgradePackage,
    isSuccess,
    handlePaymentReceiptChange,
  };
};

export default useUpgradePackage;
