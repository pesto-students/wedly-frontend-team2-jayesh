import axios from "axios";

const token = localStorage.getItem("accessToken");
console.log(token);

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    "Access-Control-Allow-Headers": "Authorization",
    Authorization: token ? `${token}` : "",
  },
  withCredentials: true,
});

export default axiosInstance;
