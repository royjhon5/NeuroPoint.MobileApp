import { useQuery } from "@tanstack/react-query";
import { GetPublished } from "../api/services/course.api";

const useGetPublished = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["published"],
    queryFn: async () => {
      const response = await GetPublished();
      return response;
    },
  });

  return {
    isPending,
    refetchData: refetch,
    publisheddata: data?.response ? data.response : [],
  };
};

export default useGetPublished;
