import {tasksState } from '../app/App.tsx';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,

} from './todolists-reducer.ts';
import {createReducer, nanoid} from '@reduxjs/toolkit'
import {todolistId_1, todolistId_2} from './todolists-reducer.ts';


export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type CreateTaskAction = ReturnType<typeof createTaskAC>;
export type  ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC >;
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC  >;



const initialState: tasksState = {
    [todolistId_1]: [
        {id: nanoid(), title: "HTML & CSS", isDone: true},
        {id: nanoid(), title: "JS & TS", isDone: true},
        {id: nanoid(), title: "Redux", isDone: false},
        {id: nanoid(), title: "RTK query", isDone: false},
        {id: nanoid(), title: "React", isDone: false},
    ],
    [todolistId_2]: [
        {id: nanoid(), title: "Beer", isDone: true},
        {id: nanoid(), title: "Cheeps", isDone: true},
        {id: nanoid(), title: "Cola", isDone: false},
        {id: nanoid(), title: "Milk", isDone: false},
        {id: nanoid(), title: "Bread", isDone: false},
    ]
}
type actionType = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction;


export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const todolist = state.find(todo => todo.id === action.payload.id)
            if (todolist) todolist.title = action.payload.title
        })
        .addCase(changeTodolistFilterAC,(state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        })
})


export const tasksReducer2 = (tasks: tasksState = initialState, action: actionType) => {
switch(action.type){

    default:
        return tasks
    case 'delete_task':
        return {...tasks,[action.payload.todolistId]: tasks[action.payload.todolistId].filter((task) => task.id !== action.payload.taskId )}
    case "create_task":{
        const newTask = {id: nanoid(), title: action.payload.title, isDone: false}
        const todolistId = action.payload.todolistId
        return {...tasks, [todolistId] : [newTask, ...tasks[todolistId]]}
    }
    case 'change_task_status':{
        const {taskId, todolistId, isDone} = action.payload
        return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task) }
    }
    case 'change_task_title':{
        const {taskId, todolistId, title} = action.payload
        return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, title} : task) }
    }
}
}

export const deleteTaskAC = (payload: {taskId: string, todolistId: string}) => ({
    type: 'delete_task',
    payload
} as const);

export const createTaskAC = (payload: { todolistId: string, title: string}) => ({
    type: 'create_task',
    payload
} as const);
export const changeTaskStatusAC = (payload: { taskId: string, todolistId: string, isDone: boolean}) => ({
    type: 'change_task_status',
    payload
}as const);

export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => ({
    type: 'change_task_title',
    payload
}as const);


