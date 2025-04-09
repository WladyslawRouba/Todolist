import './App.css'
import { useState } from'react'
import {TodolistItem, taskType} from './TodolistItem.tsx'
import {v1} from 'uuid'

export type FilterValues = "All" | "Active" | "Completed"

function App() {
    const TodolistTitle : string = "what to lern ";
    let[tasks, setTasks] = useState<taskType[]>  ( [
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "JS & TS", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "RTK query", isDone: false},
        {id: v1(), title: "React", isDone: false},

    ])
    console.log(tasks)

    const createTask = ()=>{
       const newTask = {id: v1(), title: "create new task", isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }
    const[filter,setFilter] = useState<FilterValues>("All")

    let filteredTasks:taskType[] = tasks
    if (filter === "Active"){
     filteredTasks = tasks.filter((task)=>{
         return !task.isDone
     })
    }
    if (filter === "Completed"){
        filteredTasks = tasks.filter((task)=>{
            return task.isDone
        })
    }
    const deleteTask = (id: string)=> {
        const newTasks = tasks.filter((task)=>{
            return task.id !== id
        })
        setTasks(newTasks)

    }

     const changeFilter = (filter:FilterValues)=> {
         return setFilter(filter)
    }
  return (
      <div className="app">
      <TodolistItem
          title= {TodolistTitle}
          tasks={filteredTasks}
          deleteTask={deleteTask}
         // filteredTasks={filteredTasks}
          changeFilter={changeFilter}
          createTask={createTask}


      />

      </div>
  )
}

export default App
