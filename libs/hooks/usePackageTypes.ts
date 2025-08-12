import { useQuery } from "@tanstack/react-query";
import { getPackageTypes } from "../api/services/packagetype.api";

const usePackageTypes = () => {
  const { isFetching, refetch, data } = useQuery({
    queryKey: ["package-config"],
    queryFn: async () => {
      const response = await getPackageTypes();
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
