import {Todolist, FilterValues} from '../app/App.tsx';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit'



 export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>// определить типа который  возвращает deleteTodolistAC
 export type CreateTodolistAction = ReturnType<typeof createTodolistAC>

export const todolistId_1 = "todolist1"
export const todolistId_2 = "todolist2"



export const deleteTodolistAC = createAction< {id: string}> ('todolists/deleteTodolist')
export const changeTodolistTitleAC = createAction <{id: string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction <{id: string, filter: FilterValues}>('todolists/changeTodolistFilter')
export const createTodolistAC = createAction ('todolists/createTodolist', (title: string)=>{
    return {payload:{ title, id: nanoid() }}
})


const initialState: Todolist[] = [
    {id: todolistId_1, title: "What to learn", filter: "All"},
    {id: todolistId_2, title: "What to buy", filter: "All"},
];
export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
    })
        .addCase(createTodolistAC, (state, action) => {
         state.push({id: action.payload.id, title: action.payload.title, filter: "All"})
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








