import { baseApiSlice } from "../../../../axios/baseApiConfig";
import {
  ApiResponse,
  LoginTypes,
  RegisterTypes,
  UserApiResponse,
} from "../../../../interface";

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
      query: (data) => ({
        url: "/user/logout",
        method: "POST",
        body: data,
      }),
    }),
    refreshAcessToken: builder.mutation<UserApiResponse, string>({
      query: (token) => ({
        url: "/user/refreshToken",
        method: "POST",
        data: { token },
      }),
    }),
    getUsers: builder.query<UserApiResponse, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRefreshAcessTokenMutation,
  useGetUsersQuery,
} = UserApi;
