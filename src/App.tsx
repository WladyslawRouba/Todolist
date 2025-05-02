import './App.css'
import { useState } from'react'
import {TodolistItem} from './TodolistItem.tsx'
import {v1} from 'uuid'
import {CreateItemForm} from "./CreateItemForm.tsx";

export type FilterValues = "All" | "Active" | "Completed"
export type Todolist = {
    id: string,
    title: string,
    filter: FilterValues,
}
export type tasksState = {
    [todolistId: string]: taskType[]
}
export type taskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const[todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: "what to learn ", filter: "All"},
        {id: todolistId_2 , title: "what to buy", filter: "All"},
    ])
    const [tasks, setTasks] = useState<tasksState>({
        [todolistId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & TS", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "RTK query", isDone: false},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Cheeps", isDone: true},
            {id: v1(), title: "Cola", isDone: false},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
        ]
    })
    // CRUD Task
    const deleteTask = (id: string, todolistId: string) => {
        setTasks({...tasks,[todolistId]: tasks[todolistId].filter((task) => task.id !== id )})
    }

    const createTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId] : [...tasks[todolistId], newTask]} )
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task) })
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, title} : task) })
    }

// CRUD TodoList
    const changeFilter = (filter: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }
    const deleteTodolist = (todolistId: string) =>{
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }
    const createTodolist = (title: string) => {
        const newTodolistId = v1()
        setTodolists([...todolists, {id: newTodolistId, title, filter: "All"}])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const todolistComponents = todolists.map(tl => {
        let filteredTasks = tasks[tl.id]
        if (tl.filter === "Active") {
            filteredTasks = filteredTasks.filter((task) => {
                return !task.isDone
            })
        }
        if (tl.filter === "Completed") {
            filteredTasks = filteredTasks.filter((task) => {
                return task.isDone
            })
        }
        return(
            <TodolistItem
                key={tl.id}
                todolistId={tl.id}
                title= {tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                // filteredTasks={filteredTasks}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTaskStatus={changeTaskStatus}
                deleteTodolist={deleteTodolist}
                changeTaskTitle ={changeTaskTitle }
                changeTodolistTitle={changeTodolistTitle}


            />
        )
    })

    return (
        <div className="app">
            <CreateItemForm createItem={createTodolist}/>
            {todolistComponents}

        </div>
    )
}

export default App