import { instance } from "@/common/instance"
import { LoginInputs } from "@/features/auth/lib/schemas"
import {BaseResponse} from "@/common/types";


export const authApi = {
    login(data: LoginInputs) {
        return instance.post<BaseResponse<{ userId: number }>>("/auth/login", data)
    },

}
