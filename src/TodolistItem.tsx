
// import {Button} from "./Button.tsx";
import {Button, IconButton, Checkbox, List, ListItem} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { FilterValues, taskType } from "./App.tsx";
import {ChangeEvent, } from "react";
import { CreateItemForm } from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {getListItemSx} from "./TodolistItem.styles.ts";
type TodolistItemPropsType = {
    todolistId: string
    title: string
    tasks: taskType[]
    deleteTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterValues, todolistId: string) => void
    createTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, newStatusValue: boolean, todolistId: string) => void
    filter: FilterValues
    deleteTodolist: (id: string) => void
    changeTaskTitle:(taskId: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask, changeTaskStatus, filter,todolistId, deleteTodolist,changeTaskTitle, changeTodolistTitle}: TodolistItemPropsType)=> {

    const createTaskHandler = (title: string) => {

            createTask(title,todolistId )

    }
    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(title, todolistId)}



    const tasksItems = tasks.map(task => {
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = event.currentTarget.checked
            changeTaskStatus(task.id, newStatusValue, todolistId)

        }
        const changeTaskTitleHandler =(title: string)=>{
            changeTaskTitle(task.id, title, todolistId)
        }
        return(
            <ListItem
                disablePadding
                key={task.id}
                sx={getListItemSx(task.isDone)}
               >
                {/*<input  onChange={changeTaskStatusHandler} type="checkbox" checked={task.isDone}/>*/}
                <Checkbox checked={task.isDone}
                          onChange={changeTaskStatusHandler}
                         size={"small"}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler} />
               {/*<Button onClick= {()=> deleteTask(task.id, todolistId)} title= "x"/>/*/}
                <IconButton
                    onClick={() => deleteTask(task.id, todolistId)}
                >
                    <ClearIcon/>
                </IconButton>
            </ListItem>
        )

    })

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                {/*<Button title="X" onClick= {()=> deleteTodolist(todolistId)}/>*/}
                <IconButton
                    onClick={() => deleteTodolist(todolistId)}
                >
                    <DeleteIcon/>
                </IconButton>
            </h3>

       <CreateItemForm createItem={createTaskHandler}/>

            <List>
                {tasksItems}
            </List>

            <div>
                <Button
                    variant="contained"
                    size="small"
                    color={filter === "All" ? "primary" : "secondary"}
                    onClick ={()=> changeFilter("All", todolistId)}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    sx ={{m : '0 5px'}}
                    color={filter === "Active" ? "primary" : "secondary"}
                    onClick={()=> changeFilter("Active", todolistId)}
                >
                    Active
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    color={filter === "Completed" ? "primary" : "secondary"}
                    onClick={()=> changeFilter("Completed", todolistId)}
                >
                    Completed
                </Button>
                {/*<Button className= {filter === "All" ? "active-filter" : ""} title= "Add" onClick ={()=> changeFilter("All", todolistId)}/>*/}
                {/*<Button className= {filter === "Active" ? "active-filter" : ""} title= "Active" onClick={()=> changeFilter("Active", todolistId)}/>*/}
                {/*<Button className= {filter === "Completed" ? "active-filter" : ""} title= "Completed" onClick={()=> changeFilter("Completed", todolistId)}/>*/}
            </div>
        </div>
    )
}