import { useQuery } from "@tanstack/react-query";
import { getStudentQuizAnswers } from "../api/services/lessons.api";

const useGetStudentAnswers = (lessonId: number) => {
  const { data, refetch, isPending } = useQuery({
    queryKey: ["quiz-answers"],
    queryFn: async () => {
      const response = await getStudentQuizAnswers(lessonId);
      return response;
    },
  });
  return {
    refetch,
    isPending,
    answersList: data?.response || [],
  };
};

export default useGetStudentAnswers;
