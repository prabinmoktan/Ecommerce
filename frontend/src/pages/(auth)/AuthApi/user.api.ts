import { baseApiSlice } from "../../../axios/baseApiConfig";
import {
  ApiResponse,
  LoginTypes,
  RegisterTypes,
  UserApiResponse,
} from "../../../interface";

const UserApi = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<ApiResponse, RegisterTypes>({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation<UserApiResponse, LoginTypes>({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation<UserApiResponse, void>({
        query: (data)=> ({
            url: '/user/logout',
            method: "POST",
            body: data
        })
    })
  }),
});

export const { useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation } = UserApi;
