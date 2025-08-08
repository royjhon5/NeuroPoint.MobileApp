import { BaseResponseType } from "../../../types/BaseResponse";
import {
  GetFileAndHandoutByPackageDTO,
  GetVideoByPackageDTO,
} from "../../../types/DTO/LibraryDTO";
import httpHelper from "../httpAxios";

const baseAPI = "library";

export const getVideoByPackage = async (packageTypeId: number) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<GetVideoByPackageDTO[]>
    >(
      `${baseAPI}/get-video-by-package?packageTypeId=${packageTypeId}&searchKey=`
    );
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const getEbookByPackage = async (packageTypeId: number) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<GetFileAndHandoutByPackageDTO[]>
    >(
      `${baseAPI}/get-file-by-package?packageTypeId=${packageTypeId}&fileType=1&pageNumber=1&pageSize=20searchKey=`
    );
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

export const getHandoutsByPackage = async (packageTypeId: number) => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<GetFileAndHandoutByPackageDTO[]>
    >(
      `${baseAPI}/get-file-by-package?packageTypeId=${packageTypeId}&fileType=2&pageNumber=1&pageSize=20&searchKey=`
    );
    return response;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};
