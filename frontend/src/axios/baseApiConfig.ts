import { BaseQueryApi, BaseQueryFn,  FetchBaseQueryArgs } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
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
    api?: BaseQueryApi;
    args?: FetchBaseQueryArgs;
  },
  unknown,
  { status: number; data: unknown }
> = async ({ url, method, params, body, headers }, api) => {
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
    });
      return { data };
  } catch (axiosError) {
    const error = axiosError as AxiosError;

    if (error.response?.status === 400) {
      console.log(error.response);
    } else if (
      error.response?.status === 401 &&
      error.response.data === "token_not_valid"
    ) {
      const refresh = await axiosInstance.post("/user/refreshToken", {
        withCredentials: true
      });
      console.log('refresh===>', refresh)
      const {accessToken } = refresh.data;
       // Update the headers for the retry
       axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

       // Retry the original request
       return await baseQuery({ url, method, params, body, headers }, api, {});
    }

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
  reducerPath: 'baseApi',
  baseQuery,
  endpoints: () => ({}), // Empty initially, to be injected later
  tagTypes: []
});
