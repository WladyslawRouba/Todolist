import {tasksState } from '../app/App.tsx';
import {createTodolistAC, deleteTodolistAC,} from './todolists-reducer.ts';
import {createReducer, nanoid, createAction} from '@reduxjs/toolkit'
import {todolistId_1, todolistId_2} from './todolists-reducer.ts';


export const createTaskAC = createAction<{ todolistId: string, title: string }> ('create_task')
export const deleteTaskAC = createAction<{ taskId: string, todolistId: string }>  ('delete_task')
export const changeTaskStatusAC  = createAction<{ taskId: string, todolistId: string, isDone: boolean}>  ('change_task_status')
export const  changeTaskTitleAC  = createAction<{ taskId: string, title: string, todolistId: string }>  ('change_task_title')


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


export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(createTaskAC, (state, action) => {
            const { todolistId, title } = action.payload;
            const newTask = {
                id: nanoid(),
                title,
                isDone: false
            };
            if (!state[todolistId]) {
                state[todolistId] = [];
            }
            state[todolistId].unshift(newTask)
        })
        .addCase(deleteTaskAC, (state, action) => {
            const { todolistId } = action.payload;
            if (state[todolistId]) {
                const index = state[todolistId].findIndex((task) => task.id !== action.payload.taskId);
                if (index !== -1) {
                    state[todolistId].splice(index, 1);
                }
            }
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const { todolistId, taskId, isDone } = action.payload;
            const task = state[todolistId]?.find(task => task.id === taskId);
            if (task) {
                task.isDone = isDone;
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const {taskId, todolistId, title} = action.payload
            const task = state[todolistId]?.find(task => task.id === taskId);
            if (task) {
                task.title = title;
            }
        })
})