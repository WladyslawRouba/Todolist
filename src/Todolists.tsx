
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/TodolistItem.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolist} from "@/model/todolists-selector.ts";



export const Todolists = () => {
    const todolists = useAppSelector(selectTodolist )


    return (
<>
    {todolists.map((tl) => (
            <Grid item xs={12} key={tl.id } >
                <Paper elevation={7} sx={{ p: "25px" }}>
                    <TodolistItem
                        todolist={tl}
                    />
                </Paper>
            </Grid>
    ))}
</>
    )
}