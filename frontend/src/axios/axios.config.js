import axios from "axios";
import { errorToast } from "../services/toastify.service";
// export const baseUrl = import.meta.env.VITE_BASE_URL || "/api/v1";
// export const baseUrl = process.env.VITE_BASE_URL || "/api/v1";
const url = "http://localhost:8000/api/v1";
export const baseUrl = url || "/api/v1";
export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
    if (config.url?.includes("/login") || config.url?.includes("/refreshToken")) {
        return config;
    }
    if (!window.navigator.onLine) {
        console.log(window.navigator.onLine);
        errorToast("No internet connection ");
    }
    if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
    }
    if (config?.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    else {
        config.headers["Content-Type"] = "application/json";
    }
    // You can modify the config object here if needed
    return config;
}, (error) => {
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    ;
    // Bypass the interceptor for login request
    if (originalRequest.url.includes("/login") || originalRequest._retry) {
        return Promise.reject(error); // Don't handle retries for login request
    }
    if (error.response) {
        if (error.response?.status === 401) {
            originalRequest._retry = true;
            try {
                console.log('we are in try section');
                const refresh = await axiosInstance.post("/user/refreshToken", {}, {
                    withCredentials: true,
                });
                const { accessToken } = refresh.data;
                // axiosInstance.defaults.headers.common[
                //   "Authorization"
                // ] = `Bearer ${accessToken}`;
                // Retry the original request
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return axiosInstance.request(originalRequest);
            }
            catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        }
        if (error.response.status === 403) {
            console.log("Forbidden");
        }
        if (error.response.status === 404) {
            console.log("Not Found");
        }
        if (error.response.status === 500) {
            console.log("Server Error");
        }
    }
    return Promise.reject(error);
});
