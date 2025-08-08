import { BaseResponseType } from "../../../types/BaseResponse";
import { CourseContentDTO } from "../../../types/DTO/CourseDTO";
import httpHelper from "../httpAxios";

const baseAPI = "StudentCourse";

export const GetStudentCourse = async (courseid: number, userid: string) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<CourseContentDTO>
    >(`${baseAPI}?courseId=${courseid}&userId=${userid}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
