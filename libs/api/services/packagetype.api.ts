import { BaseResponseType } from "../../../types/BaseResponse";
import { PackageTypeDTO } from "../../../types/DTO/PackageTypeDTO";
import httpHelper from "../httpAxios";

const baseAPI = "PackageType";

export const getPackageTypes = async (branchId: number) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<PackageTypeDTO[]>
  >(`${baseAPI}?branchId=${branchId}`);
  return response;
};
