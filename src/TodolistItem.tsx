
import {Button} from "./Button.tsx";
import { FilterValues, taskType } from "./App.tsx";
import {ChangeEvent, } from "react";
import { CreateItemForm } from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
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

    //1. const title = props.title
    // const tasks = props.tasks
    // 2. const{title: title, tasks: tasks } = props
    // 3. const{title, tasks} = props

   // const[taskTitle, setTaskTitle]= useState('')
  //  const[error, setError]= useState<string | null>(null)

    /*const createTaskHandler = ()=>{
        createTask(taskTitle)
        setTaskTitle('')}*/
    const createTaskHandler = (title: string) => {

            createTask(title,todolistId )

    }

   /* const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setTaskTitle(event.currentTarget.value)
        setError(null)

    }
    const createTaskEnterHandler = (event: KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === "Enter"){
            createTaskHandler()
        }
    }*/


    const tasksItems = tasks.map(task => {
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const newStatusValue = event.currentTarget.checked
            changeTaskStatus(task.id, newStatusValue, todolistId)
        }
        return(
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input  onChange={changeTaskStatusHandler} type="checkbox" checked={task.isDone}/> <EditableSpan title={task.title} />
                <Button onClick= {()=> deleteTask(task.id, todolistId)} title= "x"/>
            </li>
        )
    })
    return (
        <div>
            <h3>
                {title}
                <Button title="X" onClick= {()=> deleteTodolist(todolistId)}/>
            </h3>

       <CreateItemForm createItem={createTaskHandler}/>
           {/* <div>
                <input className={error ? "error" : ""}
                       value={taskTitle}
                       placeholder="Enter task title"
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskEnterHandler}
                />
                <Button title="+" onClick={createTaskHandler}/>
                {error &&<div className={'error-message'}>{error}</div>}

            </div>*/}

            <ul>
                {tasksItems}

            </ul>

            <div>
                <Button className= {filter === "All" ? "active-filter" : ""} title= "Add" onClick ={()=> changeFilter("All", todolistId)}/>
                <Button className= {filter === "Active" ? "active-filter" : ""} title= "Active" onClick={()=> changeFilter("Active", todolistId)}/>
                <Button className= {filter === "Completed" ? "active-filter" : ""} title= "Complited" onClick={()=> changeFilter("Completed", todolistId)}/>
            </div>
        </div>
    )
}