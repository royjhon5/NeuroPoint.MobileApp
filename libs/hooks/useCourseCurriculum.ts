import { useQuery } from "@tanstack/react-query";
import { getCourseDetails } from "../api/services/course.api";

const useCourseCurriculum = (id: number) => {
  const { isFetching, data, refetch } = useQuery({
    queryKey: ["curriculum", id],
    queryFn: async () => {
      const response = await getCourseDetails(id);
      return response;
    },
    enabled: true,
  });
  return {
    isFetching,
    refetchCourse: refetch,
    coursecurriculum: data?.response || [],
  };
};

export default useCourseCurriculum;
