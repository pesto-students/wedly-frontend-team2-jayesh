import axios from "axios";

const token = window.localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    Authorization: token ? `${token}` : "",
  },
  withCredentials: true,
});

export default axiosInstance;
