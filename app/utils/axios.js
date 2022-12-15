import axios from "axios";
import history from "./history";
import { store } from "../app";
import { SIGNOUT_SUCCESS } from "../containers/HomePage/constants";
import { connectionTimedOutToast, custom401toast } from "./toast";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `${token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    if (
      error.response.status === 401 &&
      !window.location.href.includes("/einvite/view")
    ) {
      console.log(error.response);
      await store.dispatch({ type: SIGNOUT_SUCCESS });
      history.push("/");
      if (
        error.response.config.url !== "/authState" &&
        error.response.config.url !== "/login"
      ) {
        connectionTimedOutToast();
        localStorage.removeItem("accessToken");
      } else if (error.response.config.url === "/login") {
        custom401toast(error.response.data.message);
      }
    }
  }
);

export default axiosInstance;
