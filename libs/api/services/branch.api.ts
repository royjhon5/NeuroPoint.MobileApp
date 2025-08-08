import { BaseResponseType } from "../../../types/BaseResponse";
import { BranchDto } from "../../../types/DTO/BranchDTO";
import httpHelper from "../httpAxios";

const baseApi = `Branch`;

export const getAllBranches = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<BranchDto[]>
  >(baseApi);

  return response;
};
