import { useQuery } from "@tanstack/react-query";
import { getUserRoles } from "../api/services/user.api";

const useUserRoles = () => {
  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const response = await getUserRoles();
      return response;
    },
  });

  if (isError) {
    console.error("Error fetching user roles:", error.message);
  }

  return {
    isFetching,
    isError,
    error,
    userRoles: data || null,
  };
};

export default useUserRoles;
