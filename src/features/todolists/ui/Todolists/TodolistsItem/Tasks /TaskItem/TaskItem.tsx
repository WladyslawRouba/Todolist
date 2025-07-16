import {getListItemSx} from "./TaskItem.styles.ts"
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import type {ChangeEvent} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import type { taskType } from "@/features/todolists/model/tasks-reducer.ts";

type TodolistItemPropsType = {
    task: taskType;
    todolistId: string
}
export const TaskItem = ({ task, todolistId } : TodolistItemPropsType) => {
    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            taskId: task.id,
            isDone: event.currentTarget.checked,
            todolistId
        }))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId }))
    }

    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC({ taskId: task.id, todolistId }))
    }
    return(
        <ListItem
            disablePadding
            key={task.id}
            sx={getListItemSx(task.isDone)}
        >
            <Checkbox
                checked={task.isDone}
                onChange={changeTaskStatusHandler}
                size="small"
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} />
            <IconButton onClick={deleteTaskHandler}>
                <ClearIcon />
            </IconButton>
        </ListItem>
    )
}