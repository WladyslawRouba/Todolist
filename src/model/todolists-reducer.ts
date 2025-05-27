import {Todolist, FilterValues} from '../app/App.tsx';
import {createAction} from '@reduxjs/toolkit'
import {v1} from "uuid";



 export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>// определить типа который  возвращает deleteTodolistAC
 export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction= ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
export const todolistId_1 = "todolist1"
export const todolistId_2 = "todolist2"


 type ActionType = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | changeTodolistFilterAction

export const deleteTodolistAC = createAction< {id: string}> ('todolists/deleteTodolist')
export const changeTodolistTitleAC = createAction <{id: string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction <{id: string, filter: FilterValues}>('todolists/changeTodolistFilter')
export const createTodolistAC = createAction ('todolists/createTodolist', (title: string)=>{
    return {payload:{ title, id: v1() }}
})


const initialState: Todolist[] = [
    {id: todolistId_1, title: "What to learn", filter: "All"},
    {id: todolistId_2, title: "What to buy", filter: "All"},
];

export const todolistsReducer = (todolists: Todolist[] = initialState, action : ActionType): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return todolists.filter(tl => tl.id !== action.payload.id);
        }
        case 'create_todolist': {
            return [...todolists, {id: action.payload.id, title: action.payload.title, filter: "All"}]
        }
        case 'change_todolist_title': {
            return todolists.map(tl => tl.id ===  action.payload.id ? {...tl, title:action.payload.title} : tl)
        }
        case 'change_todolist_filter': {
            return todolists.map(tl => tl.id === action.payload.id ? {...tl, filter:action.payload.filter} : tl)
        }
        default:
            return todolists;
        }

}




