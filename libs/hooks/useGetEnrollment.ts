import { useQuery } from "@tanstack/react-query";
import { GetEnrollment } from "../api/services/enrollment.api";

const useGetEnrollment = (id: string) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["getenrollment", id],
    queryFn: async () => {
      const response = await GetEnrollment(id);
      return response;
    },
    enabled: !!id, // ❗ prevent query from running when id is empty
  });

  return {
    isPending,
    refetchData: refetch,
    enrollmentdata: data?.response ? data.response : [],
  };
};

export default useGetEnrollment;
