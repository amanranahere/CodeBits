import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_BASEURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorMsg = error.response?.data?.error;
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      errorMsg === "TokenExpiredError" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await axios.post(
          "/api/v1/user/refresh-token",
          {},
          { withCredentials: true }
        );

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Session expired, logging out.");
        toast.error("Session expired. Please login again!");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
