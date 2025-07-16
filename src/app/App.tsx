import styles from './App.module.css';
import './App.module.css'
import {selectThemeMode} from './app-selector.ts'
import {useAppSelector} from '../common/hooks/useAppSelector.ts'
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider } from '@mui/material/styles';
import {getTheme} from "../common/theme/theme.ts";
import {Header} from "@/common/components/Header/Header.tsx";
import {Main} from "@/app/Main.tsx";




export function App() {

    const themeMode =  useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <div className= {styles.app}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </ThemeProvider>

        </div>
    )
}

export default  App