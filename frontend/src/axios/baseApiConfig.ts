import {

  BaseQueryFn,
 
} from "@reduxjs/toolkit/query";
import  { AxiosError, AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios.config";
import { createApi } from "@reduxjs/toolkit/query/react";

// Make sure you provide the correct types for `createApi`
const baseQuery: BaseQueryFn<
  {
    url: string;
    method: AxiosRequestConfig["method"];
    params?: AxiosRequestConfig["params"];
    body?: AxiosRequestConfig["data"];
    headers?: AxiosRequestConfig["headers"];
    // api?: BaseQueryApi;
    // args?: FetchBaseQueryArgs;
  },
  unknown,
  { status: number; data: unknown }
> = async ({ url, method, params, body, headers }) => {
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
  } catch (axiosError) {
    const error = axiosError as AxiosError;

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
