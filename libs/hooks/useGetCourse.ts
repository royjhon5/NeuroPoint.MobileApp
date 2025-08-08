import { useQuery } from "@tanstack/react-query";
import { GetCourse } from "../api/services/course.api";

const useGetCourse = (id: number) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["getcourse", id],
    queryFn: async () => {
      const response = await GetCourse(id);
      return response;
    },
  });
  const totalLessonsCount =
    data?.response?.curriculum?.reduce((acc, curriculumItem) => {
      if (Array.isArray(curriculumItem.topics)) {
        const lessonsInThisCurriculum = curriculumItem.topics.reduce(
          (topicAcc, topic) => {
            return (
              topicAcc +
              (Array.isArray(topic.lessons) ? topic.lessons.length : 0)
            );
          },
          0
        );
        return acc + lessonsInThisCurriculum;
      }
      return acc;
    }, 0) ?? 0;
  return {
    isPending,
    refetchData: refetch,
    coursedata: data?.response ?? null,
    totalAmount: data?.total ?? 0,
    course: data?.response?.course ?? null,
    curriculumCount: data?.response?.curriculum?.length ?? 0,
    lessonsCount: totalLessonsCount,
  };
};

export default useGetCourse;
