import { BaseResponseType } from "../../../types/BaseResponse";
import { EnrollmentDTO } from "../../../types/DTO/EnrollmentDTO";
import httpHelper from "../httpAxios";

const baseAPI = "Enrollment";

export const GetEnrollment = async (id: string) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<EnrollmentDTO[]>
    >(`${baseAPI}/${id}`);
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
