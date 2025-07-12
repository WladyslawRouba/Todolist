import {createTheme} from "@mui/material/styles";
import {blue, deepOrange} from "@mui/material/colors";
import {ThemeMode} from "@/app/app-reducer.ts";


export const getTheme = (themeMode: ThemeMode) => {
    return (createTheme({
                palette: {
                    primary: blue,
                    secondary: deepOrange,
                    mode: themeMode ,
                }
            }
        )

    )
}