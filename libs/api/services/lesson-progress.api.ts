import { BaseResponseType } from "../../../types/BaseResponse";
import httpHelper from "../httpAxios";

const baseAPI = "StudentCourseProgress";

export const createLessonProgress = async (params: {
  userId: string;
  lessonId: number;
  courseId: number;
}) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `${baseAPI}`,
    params
  );

  return response;
};
