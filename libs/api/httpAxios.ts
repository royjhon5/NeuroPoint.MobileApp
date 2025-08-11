import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse, isAxiosError } from "axios";

const httpHelper = axios.create({
  baseURL: "https://prod01-neuropoint-appsvc.azurewebsites.net/",
  timeout: 60000,
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem("token")}`,
  },
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
  (response: AxiosResponse) => response,
  function (error) {
    if (isAxiosError(error)) {
      console.log("Axios error:", error);
      return Promise.reject(error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default httpHelper;
