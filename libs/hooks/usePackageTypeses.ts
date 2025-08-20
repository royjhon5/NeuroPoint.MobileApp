import { getPackageTypeses } from "@/libs/api/services/packagetype.api";
import { useQuery } from "@tanstack/react-query";

const usePackageTypeses = (branchId: number) => {
  const { isFetching, refetch, data } = useQuery({
    queryKey: ["package-config", branchId],
    queryFn: async () => {
      const response = await getPackageTypeses(branchId);
      return response;
    },
  });
  return {
    isFetching,
    refetch,
    packagedata: data?.response || [],
  };
};

export default usePackageTypeses;
