import { axiosInstance } from "./axios.config";
import { createApi } from "@reduxjs/toolkit/query/react";
// Make sure you provide the correct types for `createApi`
const baseQuery = async ({ url, method, params, body, headers }) => {
    try {
        const { data } = await axiosInstance.request({
            url,
            method,
            params,
            data: body,
            headers: {
                ...headers,
                accept: "application/json",
            },
            withCredentials: true,
        });
        return { data };
    }
    catch (axiosError) {
        const error = axiosError;
        return {
            error: {
                status: error.response?.status ?? 500,
                data: error.response?.data ?? "Unknown error",
            },
        };
    }
};
// Provide a generic type to the `createApi` to handle endpoints correctly
export const baseApiSlice = createApi({
    reducerPath: "baseApi",
    baseQuery,
    endpoints: () => ({}), // Empty initially, to be injected later
    tagTypes: ["Product", "Category"],
});
