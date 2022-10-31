import axios from "axios";

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

export default axiosInstance;
