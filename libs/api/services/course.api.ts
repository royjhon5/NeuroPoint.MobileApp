import { BaseResponseType } from "../../../types/BaseResponse";
import { CourseContentDTO, PublishedDTO } from "../../../types/DTO/CourseDTO";
import httpHelper from "../httpAxios";

const baseAPI = "course";

export const GetCourse = async (id: number) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<CourseContentDTO>
    >(`${baseAPI}/${id}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const GetPublished = async () => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<PublishedDTO[]>
    >(`${baseAPI}/published`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const getCourseDetails = async (id: number) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<CourseContentDTO>
  >(`${baseAPI}/take/${id}`);
  return response;
};

export const enrollCourse = async (params: {
  studentId: string;
  courseId: number;
  branchId: number;
}) => {
  const { data: response } = await httpHelper.post<BaseResponseType<number>>(
    `enrollment`,
    params
  );

  return response;
};
