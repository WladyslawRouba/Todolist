import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, taskType} from "@/model/tasks-reducer.ts";
import type {ChangeEvent} from "react";
import {getListItemSx} from "@/TodolistItem.styles.ts";
import {EditableSpan} from "@/EditableSpan.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolist} from "@/model/todolists-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";

type TodolistItemPropsType = {
    todolist: Todolist
}
export const Tasks = ({ todolist}: TodolistItemPropsType) => {
    const { id: todolistId,  filter } = todolist;
    const tasks = useAppSelector(selectTasks)

    let filteredTasks = tasks[todolist.id];

    if (filter === "Active") {
        filteredTasks = filteredTasks.filter((task: taskType) => !task.isDone);
    }
    if (filter === "Completed") {
        filteredTasks = filteredTasks.filter((task: taskType) => task.isDone);
    }

    const dispatch = useAppDispatch()
    return (
        <List>

            {filteredTasks.map((task: taskType)=> {


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

            return (
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
})}
        </List>
    )
}