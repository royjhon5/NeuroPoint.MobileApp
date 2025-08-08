import { useQuery } from "@tanstack/react-query";
import { GetLessonQuestions } from "../api/services/lessons.api";

const useGetLessons = (id: number) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["getlessons", id],
    queryFn: async () => {
      const response = await GetLessonQuestions(id);
      return response;
    },
    enabled: !!id,
  });

  return {
    isPending,
    refetchData: refetch,
    lessonsdata: data?.response ? data.response : [],
  };
};

export default useGetLessons;
