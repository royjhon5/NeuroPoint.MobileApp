import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { BaseResponseType } from "../../types/BaseResponse";
import { enrollCourse } from "../api/services/course.api";

const useCourseEnrollment = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: enrollCourse,
    onSuccess: async (res) => {
      const response = res as BaseResponseType<number>;
      if (response.isSuccess) {
        Toast.show({
          type: "success",
          text1: "Successfully Enrolled!",
        });
      } else {
        Toast.show({
          type: "error",
          text1: `${response.validatorError.message}`,
        });
      }
      router.push("/dashboard/my-couses/myCourse");
    },
    onError: (res) => {
      Toast.show({
        type: "error",
        text1: `${res.message}`,
      });
    },
  });
  const onSubmit = (courseId: number, studentid: string, brandId: number) => {
    mutate({
      courseId,
      studentId: studentid,
      branchId: brandId,
    });
  };

  return {
    onSubmit,
    isPending,
  };
};

export default useCourseEnrollment;
