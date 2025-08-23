import { BaseResponseType } from "../../../types/BaseResponse";
import {
  CurrentUserDto,
  GetUserDto,
  LoginResponseDto,
  UserDto,
  UserSignInDto,
  UserSignUpDto,
  UserUpdateDto,
} from "../../../types/DTO/UserDTO";
import httpHelper from "../httpAxios";

const baseAPI = "Account";

export const userSignIn = async (params: UserSignInDto) => {
  const { data: response } = await httpHelper.post<
    BaseResponseType<LoginResponseDto>
  >(`${baseAPI}/login`, { ...params });
  return response;
};

export const userSignUp = async (params: UserSignUpDto) => {
  const { data: response } = await httpHelper.post<BaseResponseType<string[]>>(
    `${baseAPI}/register`,
    {
      ...params,
    }
  );
  console.log(response);
  return response;
};

export const updateUser = async (params: UserUpdateDto) => {
  const { ...body } = params;
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/update`,
    body
  );
  return response;
};

export const getCurrentUser = async () => {
  try {
    const { data: response } = await httpHelper.get<
      BaseResponseType<CurrentUserDto>
    >(`${baseAPI}/current-user`);
    return response;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

export const getAllUsers = async () => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<GetUserDto[]>
  >(`${baseAPI}/all`);
  return response;
};

export const getUserRoles = async () => {
  try {
    const { data: response } = await httpHelper.get(`${baseAPI}/user-roles`);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getUserRoles:", error.message);
    } else {
      console.error("Error in getUserRoles:", error);
    }
    throw error; // Re-throw to let react-query handle it
  }
};

export const getAllUsersBro = async (params: {
  studentName?: string;
  pageNumber: number;
  branchId: number | null;
}) => {
  const { studentName, pageNumber, branchId } = params;
  // todo create endpoint for reterieving all users except students
  let query = `all?studentName=${studentName}&pageNumber=${pageNumber}&branchId=${branchId}&PageSize=200`;

  const { data: response } = await httpHelper.get<BaseResponseType<UserDto[]>>(
    `${baseAPI}/${query}`
  );
  return response;
};

export const deleteUser = async (id: string) => {
  try {
    const { data: response } = await httpHelper.delete<
      BaseResponseType<boolean>
    >(`${baseAPI}/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error as BaseResponseType<string>;
  }
};

export const updateStudentAccountPassword = async (newPassword: string) => {
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/update-student-password`,
    { newPassword }
  );
  return response;
};

export const forgotStudentPassword = async (email: string) => {
  const { data: response } = await httpHelper.post<BaseResponseType<string>>(
    `${baseAPI}/forgot-password?email=${email}`
  );
  return response;
};

export const resetStudentAccountPassword = async (params: {
  newPassword: string;
  userId: string;
}) => {
  const { data: response } = await httpHelper.post<BaseResponseType<string>>(
    `${baseAPI}/reset-student-password/${params.userId}`,
    { newPassword: params.newPassword }
  );
  return response;
};
type RNFile = { uri: string; type: string; name: string };
export const upgradeCurrentPackage = async (params: {
  studentPackageId: number;
  packageTypeId: number;
  paymentReceipt: RNFile;
}) => {
  const formData = new FormData();

  formData.append("studentPackageId", `${params.studentPackageId}`);
  formData.append("packageTypeId", `${params.packageTypeId}`);
  formData.append("paymentReceipt", {
    uri: params.paymentReceipt.uri,
    type: "image/jpeg",
    name: params.paymentReceipt.name,
  } as any);

  const { data: response } = await httpHelper.post<BaseResponseType<boolean>>(
    `${baseAPI}/upgrade-package`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const uploadProfile = async (params: { file: RNFile }) => {
  const formData = new FormData();

  formData.append("file", {
    uri: params.file.uri,
    type: "image/jpeg",
    name: params.file.name,
  } as any);

  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/upload-profile`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};
