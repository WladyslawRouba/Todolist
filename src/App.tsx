import './App.css'
import { useState } from'react'
import {TodolistItem, taskType} from './TodolistItem.tsx'

export type FilterValues = "All" | "Active" | "Completed"

function App() {
    const TodolistTitle : string = "what to lern ";
    let[tasks, setTasks] = useState<taskType[]>  ( [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "Redux", isDone: false},
        {id: 4, title: "RTK query", isDone: false},
        {id: 5, title: "React", isDone: false},

    ])
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
    const deleteTask = (id: number)=> {
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


      />

      </div>
  )
}

export default App
