export interface HttpResponseError<T> {
  response: {
    data: T;
    status: number;
  };
}
