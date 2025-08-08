import { BaseResponseType } from "../../../types/BaseResponse";
import { AnnoucementDTO } from "../../../types/DTO/AnnouncementDTO";
import httpHelper from "../httpAxios";

const baseAPI = "Annoucement";

export const GetAnnouncement = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<AnnoucementDTO[]>
  >(`${baseAPI}`);
  return response;
};
