import { useQuery } from "@tanstack/react-query";
import { GetAssessment } from "../api/services/assessment.api";

const useGetAssessment = () => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["getassessment"],
    queryFn: async () => {
      const response = await GetAssessment();
      return response;
    },
  });

  return {
    isPending,
    refetchData: refetch,
    assessmentdata: data?.response || [],
  };
};

export default useGetAssessment;
