import axios from "axios";

const token = localStorage.getItem("accessToken");

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    Authorization: token,
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((req) => {
  if (token) {
    req.headers.Authorization = `${token}`;
  }
  return req;
});

export default axiosInstance;
