import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://miapi/api",
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
