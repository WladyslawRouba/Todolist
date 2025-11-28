import { setAppErrorAC } from "@/app/app-slice"
import { ResultCode } from "@/common/enums"
import { isErrorWithMessage } from "./isErrorWithMessage"
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query/react"

export const handleError = (
    api: BaseQueryApi,
    result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) => {
  let error = "Some error occurred"

  if (result.error) {
    const status = result.error.status

    switch (status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
        error = result.error.error
        break

      case 403:
        error = "403 Forbidden Error. Check API-KEY"
        break

      case 400:
        if (isErrorWithMessage(result.error.data)) {
          error = result.error.data.message
        } else {
          error = JSON.stringify(result.error.data)
        }
        break

      default:
        // Проверяем, что status — число
        if (typeof status === "number" && status >= 500 && status < 600) {
          error = "Server error occurred. Please try again later."
        } else {
          error = JSON.stringify(result.error)
        }
        break
    }

    api.dispatch(setAppErrorAC({ error }))
  }

  // Обработка application-level errors (from backend)
  const data = result.data as { resultCode?: ResultCode; messages?: string[] }

  if (data?.resultCode === ResultCode.Error) {
    const messages = data.messages ?? []
    error = messages.length ? messages[0] : error
    api.dispatch(setAppErrorAC({ error }))
  }
}