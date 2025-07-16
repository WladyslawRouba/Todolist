import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type TodolistItemPropsType = {
    todolist: Todolist
}
export const TodolistTitle = ({todolist}: TodolistItemPropsType) => {
    const { id: todolistId, title } = todolist;
    const dispatch = useAppDispatch()
    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({ id: todolistId }))
    }
    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({ title, id: todolistId }))
    }

    return (
        <h3>
            <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} />
            <IconButton onClick={deleteTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </h3>
    )
}
