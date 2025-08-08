import { useQuery } from "@tanstack/react-query";
import { getUserRoles } from "../api/services/user.api";

const useUserRoles = () => {
  const { isFetching, data } = useQuery({
    queryKey: ["user-roles"],
    queryFn: async () => {
      const response = await getUserRoles();
      return response;
    },
  });

  return {
    isFetching,
    userRoles: data?.response || null,
  };
};

export default useUserRoles;
