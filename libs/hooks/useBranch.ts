import { useQuery } from "@tanstack/react-query";
import { getAllBranches } from "../api/services/branch.api";

const useBranch = () => {
  const { refetch, isFetching, data } = useQuery({
    queryKey: ["branches"],
    queryFn: async () => {
      const response = await getAllBranches();
      return response;
    },
  });

  return {
    isFetching,
    refetch,
    branchOptions: data?.response || [],
  };
};

export default useBranch;
