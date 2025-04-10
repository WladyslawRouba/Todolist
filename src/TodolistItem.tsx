import {TodolistTitle} from "./TodolistTitle.tsx";
import {Button} from "./Button.tsx";
import { FilterValues} from "./App.tsx";
import {ChangeEvent, KeyboardEvent, useState } from "react";

type TodolistItemPropsType = {
    title: string
    tasks: taskType[]
    deleteTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}
 export type taskType = {
    id: string
    title: string
    isDone: boolean
}
export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: TodolistItemPropsType)=> {

    //1. const title = props.title
   // const tasks = props.tasks
   // 2. const{title: title, tasks: tasks } = props
   // 3. const{title, tasks} = props

    const[taskTitle, setTaskTitle]= useState('')

    const createTaskHandler = ()=>{
        createTask(taskTitle)
        setTaskTitle('')}

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setTaskTitle(event.currentTarget.value)

    }
    const createTaskEnterHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === "Enter"){
            createTaskHandler()
        }
    }


    const tasksItems = tasks.map(task => {
        return(
            <li>
                <input  type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                <Button onClick= {()=> deleteTask(task.id)} title= "x"/>
            </li>
        )
    })
    return (
           <div>
           <TodolistTitle title={title}/>

            <div>
                <input value={taskTitle}
                       placeholder="Enter task title"
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskEnterHandler}
                />
                <Button title = "+" onClick ={createTaskHandler} disabled={!taskTitle || taskTitle.length >10}   />
                {taskTitle && <div>Maximum 10 characters</div>}
                {taskTitle.length > 10 && <div style={{color: "red"}}>Too long title</div>}
            </div>

            <ul>
                {tasksItems}
            </ul>

            <div>
                <Button title= "Add" onClick ={()=> changeFilter("All")}/>
                <Button title= "Active" onClick={()=> changeFilter("Active")}/>
                <Button title= "Complited" onClick={()=> changeFilter("Completed")}/>
            </div>
        </div>
    )
}