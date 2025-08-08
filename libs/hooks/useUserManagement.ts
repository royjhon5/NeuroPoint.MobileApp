import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/services/user.api";

const useUserManagement = () => {
  const { refetch, isFetching, data } = useQuery({
    queryKey: ["user-list"],
    queryFn: async () => {
      const response = await getAllUsers();
      return response;
    },
    enabled: false,
  });

  return {
    isFetching,
    refetch,
    userList: data?.response || [],
  };
};

export default useUserManagement;
