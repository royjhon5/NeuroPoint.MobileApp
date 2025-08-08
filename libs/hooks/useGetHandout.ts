import { useQuery } from "@tanstack/react-query";
import { getHandoutsByPackage } from "../api/services/library.api";

const useGetHandOutByPackage = (id: number) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["gethandoutbypackage", id],
    queryFn: async () => {
      const response = await getHandoutsByPackage(id);
      return response;
    },
  });

  return {
    isPending,
    refetchData: refetch,
    handoutbypackage: data?.response ? data.response : [],
  };
};

export default useGetHandOutByPackage;
