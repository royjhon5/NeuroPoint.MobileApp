export type BaseResponseType<T> = {
  response: T;
  data: T;
  isSuccess: boolean;
  statusCode: number;
  message: string;
  pageDetails?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
  validatorError: {
    message: string;
    statusCode: number;
  };
  total: number;
  totalCount: number;
};
