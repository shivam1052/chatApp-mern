import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatapp-mern-backend-xf7q.onrender.com/api",
  withCredentials: true,
});
