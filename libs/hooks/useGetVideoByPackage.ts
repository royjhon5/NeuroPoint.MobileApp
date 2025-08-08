import { useQuery } from "@tanstack/react-query";
import { getVideoByPackage } from "../api/services/library.api";

const useGetVideoByPackage = (id: number) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["getpackagebyvideo", id],
    queryFn: async () => {
      const response = await getVideoByPackage(id);
      return response;
    },
  });

  return {
    isPending,
    refetchData: refetch,
    videopackagedata: data?.response ? data.response : [],
  };
};

export default useGetVideoByPackage;
