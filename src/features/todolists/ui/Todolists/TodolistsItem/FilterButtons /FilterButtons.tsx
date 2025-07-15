import {Button} from "@mui/material";
import {changeTodolistFilterAC, FilterValues, Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type TodolistItemPropsType = {
    todolist: Todolist
}


export const FilterButtons = ({ todolist}: TodolistItemPropsType) => {
    const { id: todolistId,  filter } = todolist;

    const changeFilterHandler = (filter: FilterValues) => {
        const dispatch = useAppDispatch()
        dispatch(changeTodolistFilterAC({ filter, id: todolistId }))
    }
    return (
        <div>
            <Button
                variant="contained"
                size="small"
                color={filter === "All" ? "primary" : "secondary"}
                onClick={() => changeFilterHandler("All")}
            >
                All
            </Button>
            <Button
                variant="contained"
                size="small"
                sx={{m: '0 5px'}}
                color={filter === "Active" ? "primary" : "secondary"}
                onClick={() => changeFilterHandler("Active")}
            >
                Active
            </Button>
            <Button
                variant="contained"
                size="small"
                color={filter === "Completed" ? "primary" : "secondary"}
                onClick={() => changeFilterHandler("Completed")}
            >
                Completed
            </Button>
        </div>
    )
}