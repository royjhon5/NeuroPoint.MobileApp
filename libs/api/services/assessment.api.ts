import { BaseResponseType } from "../../../types/BaseResponse";
import {
  AssessmentDTO,
  StudentAssessmentDto,
} from "../../../types/DTO/AssessmentDTO";
import httpHelper from "../httpAxios";

const baseAPI = "Assessment";

export const GetAssessment = async () => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<AssessmentDTO[]>
    >(`${baseAPI}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const getStudentAssessments = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<StudentAssessmentDto[]>
  >(`${baseAPI}/students-assessment`);

  return response;
};
