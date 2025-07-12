import { Button, IconButton, Checkbox, List, ListItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    FilterValues
} from "@/model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC, taskType,

} from '@/model/tasks-reducer.ts'
import { ChangeEvent } from "react";
import { CreateItemForm } from "./CreateItemForm.tsx";
import { EditableSpan } from "./EditableSpan.tsx";
import { getListItemSx } from "./TodolistItem.styles.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {Todolist} from "@/model/todolists-reducer.ts";



type TodolistItemPropsType = {
    todolist: Todolist
}

export const TodolistItem = ({ todolist}: TodolistItemPropsType) => {
    const tasks = useAppSelector(selectTasks)
    const { id: todolistId, title, filter } = todolist;

    let filteredTasks = tasks[todolist.id];

    if (filter === "Active") {
        filteredTasks = filteredTasks.filter((task: taskType) => !task.isDone);
    }
    if (filter === "Completed") {
        filteredTasks = filteredTasks.filter((task: taskType) => task.isDone);
    }

    const dispatch = useAppDispatch()

    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({ todolistId, title }))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({ title, id: todolistId }))
    }

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({ filter, id: todolistId }))
    }

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({ id: todolistId }))
    }

    const tasksItems = filteredTasks.map((task: taskType)=> {
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
    })

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler} />
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </h3>

            <CreateItemForm createItem={createTaskHandler} />

            <List>{tasksItems}</List>

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
                    sx={{ m: '0 5px' }}
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
        </div>
    )
}
