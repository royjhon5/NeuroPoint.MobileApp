import { BaseResponseType } from "../../../types/BaseResponse";
import httpHelper from "../httpAxios";

const baseAPI = "Payment";

export type PaymentDto = {
  id: number;
  dateCreated: string;
  firstName: string;
  lastName: string;
  email: string;
  status: number;
  receipt: string;
  packageName: string;
  packageAmount: number;
  phoneNumber: string;
  address?: string;
  userId: string;
  isActive: boolean;
};
export const uploadPaymentReceipt = async (params: {
  file: RNFile;
  userId: string;
  studentPackageId: number;
}) => {
  const formData = new FormData();
  formData.append("file", {
    uri: params.file.uri,
    type: "image/jpeg",
    name: params.file.name,
  } as any);

  formData.append("userId", params.userId);
  formData.append("studentPackageId", `${params.studentPackageId}`);

  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/uploadReceipt`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export type RNFile = { uri: string; type: string; name: string };
export const uploadPaymentReceiptOnEnroll = async (params: {
  file: RNFile;
  userId: string;
}) => {
  const formData = new FormData();

  formData.append("file", {
    uri: params.file.uri,
    type: "image/jpeg",
    name: params.file.name,
  } as any);

  console.log(params.file);

  formData.append("userId", params.userId);

  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/upload-payment-on-enroll`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const getAllPayments = async (params: {
  paymentStatus: number | string;
  studentName: string;
  currentPage: number;
}) => {
  let query;

  if (params.paymentStatus !== "All" && params.studentName) {
    query = `All?pageNumber=${params.currentPage}&pageSize=10&paymentStatus=${params.paymentStatus}&studentName=${params.studentName}`;
  } else if (params.paymentStatus === "All" && params.studentName) {
    query = `All?pageNumber=${params.currentPage}&pageSize=10&studentName=${params.studentName}`;
  }

  if (params.paymentStatus !== "All" && !params.studentName) {
    query = `All?pageNumber=${params.currentPage}&pageSize=10&paymentStatus=${params.paymentStatus}`;
  } else if (params.paymentStatus === "All" && !params.studentName) {
    query = `All?pageNumber=${params.currentPage}&pageSize=10`;
  }

  const { data: response } = await httpHelper.get<
    BaseResponseType<PaymentDto[]>
  >(`${baseAPI}/${query}`);

  return response;
};

export const getPaymentsByUserId = async (userId: string) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<PaymentDto[]>
  >(`${baseAPI}/getPaymentsByUserId/${userId}`);

  return response;
};

export const getPaymentsUpgrade = async (studentName: string) => {
  const { data: response } = await httpHelper.get<
    BaseResponseType<PaymentDto[]>
  >(`${baseAPI}/Upgrades?studentName=${studentName}`);

  return response;
};

export const updatePaymentStatus = async (params: {
  paymentId: number;
  statusType: number;
}) => {
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/UpdatePaymentStatus`,
    params
  );

  return response;
};

export const deletePayment = async (paymentId: number) => {
  try {
    const { data: response } = await httpHelper.delete<
      BaseResponseType<boolean>
    >(`${baseAPI}/delete/${paymentId}`);
    return response;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error as BaseResponseType<string>;
  }
};

export const confirmPackageUpgradePayment = async (params: {
  previousPaymentId: number;
  newPaymentId: number;
}) => {
  const { data: response } = await httpHelper.patch<BaseResponseType<boolean>>(
    `${baseAPI}/ConfirmPackageUpgradePayment`,
    params
  );

  return response;
};
