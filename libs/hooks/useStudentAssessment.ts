import { useQuery } from "@tanstack/react-query";
import { getStudentAssessments } from "../api/services/assessment.api";

const useStudentAssessments = () => {
  const { data } = useQuery({
    queryKey: ["student-assessments"],
    queryFn: async () => {
      const response = await getStudentAssessments();
      return response;
    },
  });

  const result = data?.response.sort((a, b) => b.score - a.score);

  return {
    list: result ?? [],
  };
};

export default useStudentAssessments;
