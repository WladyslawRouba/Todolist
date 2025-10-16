
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import  { SyntheticEvent } from'react';
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {selectAppError,setAppErrorAC} from "@/app/app-slice.ts";


export const ErrorSnackbar = () => {
 /*   const [open, setOpen] = useState(true);*/
const error = useAppSelector(selectAppError);
const dispatch = useAppDispatch();

    const handleClose = (
        _event?: SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

       dispatch(setAppErrorAC({error:null}))
    };

    return (
        <div>

            <Snackbar open={error!== null} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}
