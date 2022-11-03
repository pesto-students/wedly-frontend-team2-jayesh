import axios from "axios";
// import { signOut } from "../containers/HomePage/saga";
import history from "./history";
import { store } from "../app";
import { SIGNOUT_SUCCESS } from "../containers/HomePage/constants";
import { connectionTimedOutToast } from "./toast";

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
    if (error.response.status === 401) {
      await store.dispatch({ type: SIGNOUT_SUCCESS });
      history.push("/");
      if (error.response.config.url !== "/authState") {
        connectionTimedOutToast();
        localStorage.removeItem("accessToken");
      }
    }
  }
);

export default axiosInstance;
