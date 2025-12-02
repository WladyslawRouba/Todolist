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
    const err = result.error

    // FETCH_ERROR | PARSING_ERROR | CUSTOM_ERROR
    if ("error" in err && typeof err.error === "string") {
      error = err.error
    }
    // HTTP status errors
    else if ("status" in err) {
      const status = typeof err.status === "number" ? err.status : NaN

      switch (status) {
        case 400:
          if (isErrorWithMessage(err.data)) {
            error = err.data.message
          } else {
            error = JSON.stringify(err.data)
          }
          break
        case 403:
          error = "403 Forbidden Error. Check API-KEY"
          break
        default:
          if (!isNaN(status) && status >= 500 && status < 600) {
            error = "Server error occurred. Please try again later."
          } else {
            error = JSON.stringify(err)
          }
      }
    }

    api.dispatch(setAppErrorAC({ error }))
  }

  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppErrorAC({ error }))
  }
}
