import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import {NavButton} from "@/NavButton.ts";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selector.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/common/theme/theme.ts";

export const Header = () => {
    const themeMode =  useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const dispatch = useAppDispatch()
    const changeMode = () =>{
        dispatch(changeThemeModeAC({ themeMode: themeMode === 'light' ? 'dark' : 'light' }))
    }

    return(
        <AppBar position="static">
            <Toolbar>
                <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Box>
                        <NavButton variant="outlined">Sign in</NavButton>
                        <NavButton sx={{m: "0 10px"}} variant="outlined">Sign up</NavButton>
                        <NavButton background={theme.palette.secondary.main} variant="outlined">FAQ</NavButton>
                        <Switch onChange={changeMode} checked={themeMode === "dark"}></Switch>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

