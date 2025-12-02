import { baseApi } from "@/app/baseApi.ts"

export type CaptchaResponse = {
    url: string
}

export const securityApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCaptcha: builder.query<CaptchaResponse, void>({
            query: () => "/security/get-captcha-url",
            providesTags: ["Captcha"],
        })
    })
})
export const { useGetCaptchaQuery } = securityApi