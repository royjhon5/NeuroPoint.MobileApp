import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { BaseResponseType } from "../../types/BaseResponse";
import { LoginResponseDto } from "../../types/DTO/UserDTO";
import { userSignIn } from "../api/services/user.api";
import { LoginFormType, loginSchema } from "../schema/schema";

const useSignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: userSignIn,
    onMutate: () => setLoading(true),
    onSuccess: async (res) => {
      const data = res as BaseResponseType<LoginResponseDto>;

      if (data?.isSuccess) {
        const {
          userId,
          token,
          roles,
          email,
          firstName,
          lastName,
          branchId,
          currentPackage,
          isProfileApproved,
          profileFeedback,
        } = data.response;
        const {
          packageTypeId,
          paymentStatus,
          packageName,
          price,
          studentPackageTypeId,
        } = currentPackage;
        await AsyncStorage.multiSet([
          ["userid", userId],
          ["token", token],
          [
            "user",
            JSON.stringify({
              userId: userId,
              username: `${firstName} ${lastName}`,
              role: roles[0],
              email,
              branchId: branchId,
              packageTypeId: packageTypeId,
              paymentStatus: paymentStatus,
              isProfileApproved,
              profileFeedback,
              packageName,
              price,
              studentPackageTypeId,
            }),
          ],
        ]);

        setIsAuthenticated(true); // Update isAuthenticated immediately

        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: `Welcome, ${firstName} ${lastName} ${packageName}`,
        });

        router.replace("/dashboard");
      } else {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Unauthorized user.",
        });
      }
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Unauthorized user.",
      });
    },
    onSettled: () => setLoading(false),
  });

  const onSubmit = ({ email, password }: LoginFormType) => {
    mutate({ email, password });
  };

  return {
    form,
    onSubmit,
    loading: loading || isPending,
  };
};

export default useSignIn;
