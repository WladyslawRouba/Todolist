import './App.css'
import {useReducer,useState} from'react'

import {TodolistItem} from './TodolistItem.tsx'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from './model/todolists-reducer.ts'
import {tasksReducer,deleteTaskAC, createTaskAC,changeTaskStatusAC, changeTaskTitleAC } from './model/tasks-reducer.ts'
import {v1} from 'uuid'
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {NavButton} from "./NavButton.ts";
import { createTheme, ThemeProvider, } from '@mui/material/styles';
import {blue, deepOrange} from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const todolistId_1 = v1()
const todolistId_2 = v1()
export type FilterValues = "All" | "Active" | "Completed"

let initialState: Todolist[] = [
    {id: todolistId_1, title: "what to learn ", filter: "All"},
    {id: todolistId_2, title: "what to buy", filter: "All"},
]

let initialTasks: tasksState = {
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
}

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

    // const[todolists, setTodolists] = useState<Todolist[]>([
    //     {id: todolistId_1, title: "what to learn ", filter: "All"},
    //     {id: todolistId_2 , title: "what to buy", filter: "All"},
    // ])
    const[todolists, dispatchTodoList] = useReducer(todolistsReducer, initialState )
    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks)

    /*const [tasks, setTasks] = useState<tasksState>({
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
    })*/
    // CRUD Task
    const deleteTask = (id: string, todolistId: string) => {
        const action = deleteTaskAC({taskId: id, todolistId})
        dispatchTasks(action)
        // setTasks({...tasks,[todolistId]: tasks[todolistId].filter((task) => task.id !== id )})
    }

    const createTask = (title: string, todolistId: string) => {
        const action = createTaskAC({todolistId, title})
        dispatchTasks(action)
        // setTasks({...tasks, [todolistId] : [...tasks[todolistId], newTask]} )
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const action = changeTaskStatusAC({taskId, isDone, todolistId})
        dispatchTasks(action)
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task) })
    }
    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, title} : task) })
        const action = changeTaskTitleAC({taskId, title, todolistId})
        dispatchTasks(action)
    }

// CRUD TodoList
    const changeFilter = (filter: FilterValues, todolistId: string) => {
        const action = changeTodolistFilterAC ({filter, id: todolistId})
        dispatchTodoList(action)
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        const action = changeTodolistTitleAC ({title, id: todolistId})
        dispatchTodoList(action)
     }
    const deleteTodolist = (todolistId: string) =>{
       const action = deleteTodolistAC (todolistId)
        dispatchTodoList(action)
        delete tasks[action.payload.id]
    }
    const createTodolist = (title: string) => {
      const action = createTodolistAC(title)
        dispatchTodoList(action)
        dispatchTasks(action)
        // setTasks({...tasks, [action.payload.id]: []})
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
            <Grid  key={tl.id}>
                <Paper elevation={7} sx={{p: "25px"}}>
                    <TodolistItem
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
                </Paper>
            </Grid>


        )
    })
    const  [isDarkMode, setIsDarkMode] = useState(false)
const theme = createTheme({

        palette: {
            primary: blue,
            secondary: deepOrange,
        mode: isDarkMode ? "dark" : "light",
            }
    }
)
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box>
                                <NavButton variant="outlined">Sign in</NavButton>
                                <NavButton sx={{m: "0 10px"}} variant="outlined">Sign up</NavButton>
                                <NavButton background={theme.palette.secondary.main} variant="outlined">FAQ</NavButton>
                                <Switch onChange={()=> setIsDarkMode(!isDarkMode)}></Switch>
                            </Box>
                        </Container>


                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container spacing={5} sx={{p: "25px 0"}}>
                        <CreateItemForm createItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={5}>
                        {todolistComponents}
                    </Grid>

                </Container>
            </ThemeProvider>

        </div>
    )
}

export default App