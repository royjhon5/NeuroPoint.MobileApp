import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { BaseResponseType } from "../../types/BaseResponse";
import {
  RNFile,
  uploadPaymentReceiptOnEnroll,
} from "../api/services/payment.api";
import { userSignUp } from "../api/services/user.api";
import { registerSchema, RegisterSchemaType } from "../schema/User.schema";
import useBranch from "./useBranch";
import useSignIn from "./useSignIn";

export interface SignUpUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  branchId: number;
  packageType: number;
}

const useSignUp = () => {
  const router = useRouter();
  const { onSubmit: signInUser } = useSignIn();
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const { branchOptions } = useBranch();
  const [paymentReceipt, setPaymentReceipt] = useState<RNFile>({
    uri: "",
    name: "",
    type: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const packageType = useRef<number>(2);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });
  const branchId = selectedBranchId;
  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: async (res) => {
      const data = res as BaseResponseType<string[]>;
      if (data.isSuccess && data.statusCode === 201) {
        const userId = data.response[0];
        Toast.show({
          type: "error",
          text2: "Enrollement Success!",
        });
        router.push("/(auth)/login");

        if (paymentReceipt) {
          await uploadPackagePaymentReceipt(userId);
        }
      }
    },
    onError: (error: { response: string }) => {
      Toast.show({
        type: "error",
        text2: `${error.response}`,
      });
    },
  });

  const uploadPackagePaymentReceipt = async (userId: string) => {
    try {
      const response = await uploadPaymentReceiptOnEnroll({
        userId,
        file: paymentReceipt,
      });

      if (response.isSuccess) {
        signInUser({
          email: getValues("email"),
          password: getValues("password"),
        });
      } else {
        Toast.show({
          type: "success",
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

  const onSubmit = (data: RegisterSchemaType) => {
    const { firstName, lastName, email, password, mobileNumber, address } =
      data;
    mutation.mutate({
      firstName,
      lastName,
      email,
      password,
      packageTypeId: packageType.current,
      roleId: "546a8454-a822-47a6-81d0-ca93b5dc85a4",
      branchId: 1,
      mobileNumber,
      address,
    });
  };

  const isLoading = mutation.status === "pending";

  const isFormValid = () => {
    if (!branchId) {
      Toast.show({
        type: "error",
        text2: "No branch type Partner found.",
      });
      return false;
    }

    // trigger validation for all fields
    trigger();
    if (
      getValues("firstName") &&
      getValues("lastName") &&
      getValues("email") &&
      getValues("password") &&
      branchId
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isPasswordInvalid = (): boolean => {
    const password = getValues("password");
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(password);

    return !hasNonAlphanumeric || !hasLowercase || !hasUppercase ? true : false;
  };

  const handlePaymentReceiptChange = (file: {
    uri: string;
    name: string;
    type: string;
  }) => {
    setPaymentReceipt(file);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    isLoading,
    errors,
    trigger,
    formRef,
    packageType,
    branchOptions,
    details: {
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      email: getValues("email"),
      password: getValues("password"),
      branchId,
      packageType: packageType.current,
    } as SignUpUserDetails,
    setSelectedBranchId,
    isFormValid,
    isPasswordInvalid,
    handlePaymentReceiptChange,
  };
};

export default useSignUp;
