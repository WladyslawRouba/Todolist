import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import { createTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {Todolists} from "@/features/todolists/ui/Todolists/Todolists.tsx";




export const Main = () => {

    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))


    }
    return (
        <Container>
            <Grid container spacing={5} sx={{p: "25px 0"}}>
                <CreateItemForm createItem={createTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                <Todolists/>
            </Grid>
        </Container>
    );
};