import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/services/user.api";

const useUserDetails = () => {
  const { data, isPending } = useQuery({
    queryKey: ["getuserdetauls"],
    queryFn: async () => {
      const response = await getCurrentUser();
      return response;
    },
  });

  return {
    isPending,
    getUserDetails: data?.response ?? null,
  };
};
export default useUserDetails;
