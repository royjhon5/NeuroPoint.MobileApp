import { useQuery } from "@tanstack/react-query";
import { getPackageTypes } from "../api/services/packagetype.api";

const usePackageTypes = (branchId: number) => {
  const { isFetching, refetch, data } = useQuery({
    queryKey: ["package-config", branchId],
    queryFn: async () => {
      const response = await getPackageTypes(branchId);
      return response;
    },
  });
  return {
    isFetching,
    refetch,
    packagedata: data?.response || [],
  };
};

export default usePackageTypes;
