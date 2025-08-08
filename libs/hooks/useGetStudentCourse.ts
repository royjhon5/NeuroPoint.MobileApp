import { useQuery } from "@tanstack/react-query";
import { GetStudentCourse } from "../api/services/studentcourse.api";

const useGetstudentCourse = (courseid: number, userid: string) => {
  const { refetch, data, isPending } = useQuery({
    queryKey: ["getstudentcourse", courseid, userid],
    queryFn: async () => {
      const response = await GetStudentCourse(courseid, userid);
      return response;
    },
    enabled: !!courseid && !!userid,
  });

  return {
    isPending,
    refetchData: refetch,
    studentcoursedata: data?.response ?? null, // now a single object
  };
};

export default useGetstudentCourse;
