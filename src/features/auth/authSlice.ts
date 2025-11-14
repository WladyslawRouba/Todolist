import {createAppSlice, handleServerAppError, handleServerNetworkError} from '@/common/utils'
import type { LoginInputs } from '@/features/auth/lib/schemas'
import { authApi } from '@/features/auth/api/authApi.ts'
import {setAppStatusAC} from "@/app/app-slice.ts";
import {ResultCode} from "@/common/enums";
import { AUTH_TOKEN } from '@/common/constans'


export const authSlice = createAppSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: create => ({
        loginTC: create.asyncThunk(
            async (data: LoginInputs, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatusAC({ status: "loading" }))
                    const res = await authApi.login(data)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({ status: "succeeded" }))
                        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                        return {isLoggedIn: true}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                },
            }
        ),
        logoutTC: create.asyncThunk(
            async (_args, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatusAC({ status: "loading" }))
                    const res = await authApi.logout()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({ status: "succeeded" }))
                        localStorage.removeItem(AUTH_TOKEN)
                        return {isLoggedIn: false}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                },
            }
        ),
        meTC: create.asyncThunk(
            async (_args, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatusAC({ status: "loading" }))
                    debugger
                    const res = await authApi.me()
                    debugger
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatusAC({ status: "succeeded" }))

                        return {isLoggedIn: true}
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(dispatch, error)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                },
            }
        ),
    }),
selectors : {
    selectIsLoggedIn: state => state.isLoggedIn,
}
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC,logoutTC, meTC } = authSlice.actions
export const authReducer = authSlice.reducer