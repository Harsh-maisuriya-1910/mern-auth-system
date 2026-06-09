import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const statusCode = error.response?.status;
    const message = error.response?.data?.message || "";

    const isTokenExpired =
      statusCode === 401 &&
      message.toLowerCase().includes("token expired");

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);