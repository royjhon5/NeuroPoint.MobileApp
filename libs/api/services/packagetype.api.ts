import { BaseResponseType } from "../../../types/BaseResponse";
import { PackageTypeDTO } from "../../../types/DTO/PackageTypeDTO";
import httpHelper from "../httpAxios";

const baseAPI = "PackageType";

export const getPackageTypes = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<PackageTypeDTO[]>
  >(`${baseAPI}?branchId=null`);
  return response;
};

export const getPackageTypeses = async (branchId: number) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<PackageTypeDTO[]>
  >(`${baseAPI}?branchId=${branchId}`);
  return response;
};
