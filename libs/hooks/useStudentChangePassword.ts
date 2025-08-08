import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { updateStudentAccountPassword } from "../api/services/user.api";
import {
  changeStudentPasswordSchema,
  ChangeStudentPasswordSchemaType,
} from "../schema/Student.schema";

const useStudentChangePassword = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeStudentPasswordSchemaType>({
    resolver: zodResolver(changeStudentPasswordSchema),
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: updateStudentAccountPassword,
    mutationKey: ["change-student-password"],
    onSuccess: (response) => {
      if (response.isSuccess) {
        Toast.show({
          type: "success",
          text1: "Password changed successfully",
        });
        reset();
      }
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error: Unable to change password.",
      });
    },
  });

  const onSubmit = ({
    newPassword,
    confirmPassword,
  }: ChangeStudentPasswordSchemaType) => {
    if (newPassword && confirmPassword) {
      mutate(newPassword); // 👈 Double check this if `mutate` expects an object!
    }
  };

  return {
    control, // ✅ returned
    handleSubmit,
    errors,
    isPending,
    isSuccess,
    onSubmit,
  };
};

export default useStudentChangePassword;
