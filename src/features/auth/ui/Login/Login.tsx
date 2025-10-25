import { selectThemeMode } from "@/app/app-slice"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from "@mui/material/Grid2"
import TextField from '@mui/material/TextField'
import s from './Login.module.css'
import {Controller, type SubmitHandler,useForm} from "react-hook-form";

type LoginInputs = {
   email: string
  password: string
    rememberMe: boolean
}

export const Login = () => {
    console.log('render')
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    const {register,
        handleSubmit,
        reset,
        formState: {errors},
        control,
    } = useForm<LoginInputs>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        }
    })

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        console.log(data)
        reset()
    }
    return (
        <Grid container justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>
                        To login get registered
                        <a
                            style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                            href="https://social-network.samuraijs.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>
                        <b>Email:</b> free@samuraijs.com
                    </p>
                    <p>
                        <b>Password:</b> free
                    </p>
                </FormLabel>
                 <form onSubmit={handleSubmit(onSubmit)}>
                     <FormGroup>
                         <TextField label="Email" margin="normal" error={!!errors.email} {...register("email", {
                             required: {
                                 value: true,
                                 message: "Email не должен быть пустым"
                             },

                             pattern :{
                                 value:  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                                 message: "невалидный email!",
                             },

                         })} />
                         {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}
                         <TextField type="password" label="Password" margin="normal" {...register("password")} />
                         <FormControlLabel
                             label="Remember me"
                             control={
                             <Controller
                             name="rememberMe"
                             control={control}
                             render={({ field: {value, ...rest} }) => (<Checkbox checked={value}{...rest}/>
                             )}
                         />}/>


                         <Button type="submit" variant="contained" color="primary">
                             Login
                         </Button>
                     </FormGroup>
                 </form>

            </FormControl>
        </Grid>
    )
}