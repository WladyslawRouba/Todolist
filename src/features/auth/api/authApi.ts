import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { LoginInputs } from "@/features/auth/lib/schemas"
import {baseApi} from "@/app/baseApi.ts";

export const authApi = baseApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => ({url: "auth/me", method: "GET"})
    }),
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        headers: {},
        body
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        method: "DELETE",
        url: "auth/login",

      }),
    }),
  }),
})
  export const{ useMeQuery, useLoginMutation, useLogoutMutation } = authApi;


export const _authApi = {
  login(payload: LoginInputs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>("auth/login", payload)
  },
  logout() {
    return instance.delete<BaseResponse>("auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
  },
}

