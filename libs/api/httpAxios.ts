import { HttpResponseError } from "@/types/ResponseError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";

const httpHelper = axios.create({
  baseURL: "https://prod01-neuropoint-appsvc.azurewebsites.net",
  timeout: 60000,
});

httpHelper.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userid");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (userId) {
      config.headers.userid = userId;
    }
    return config;
  },
  function (error) {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

httpHelper.interceptors.response.use(
  function (response: AxiosResponse) {
    // Handle response data
    return response;
  },
  function (error: HttpResponseError<any>) {
    // Handle response error
    console.log("Error2: ", error);
    return Promise.reject(error.response.data);
  }
);

export default httpHelper;
