import {Todolist, FilterValues} from '../App';
import {v1} from "uuid";



 export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>// определить типа который  возвращает deleteTodolistAC
 export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction= ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

 type ActionType = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | changeTodolistFilterAction

const initialState: Todolist[] = [];

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
export const deleteTodolistAC = (id: string)=> ({
        type: 'delete_todolist',
        payload: {
            id

        }
    } as const)

export const createTodolistAC = (title: string) => ({
    type: 'create_todolist',
    payload: {
        title, id: v1()
    }

}as const)

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => ({
    type: 'change_todolist_title',
    payload
}as const)
export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) =>({
    type: 'change_todolist_filter',
    payload
}as const)

