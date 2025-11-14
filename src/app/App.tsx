import "./App.css"
import { selectThemeMode } from "@/app/app-slice"
import { ErrorSnackbar, Header } from "@/common/components"
import { useAppSelector } from "@/common/hooks"
import { Routing } from "@/common/routing"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import {useEffect} from "react";
import {meTC} from "@/features/auth/authSlice.ts";
import {useAppDispatch} from "@/common/hooks";

export const App = () => {
  debugger
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)
  debugger
  useEffect(() => {
    debugger
    dispatch(meTC())
  },[])
debugger
  return (
    <ThemeProvider theme={theme}>
      <div className={"app"}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
