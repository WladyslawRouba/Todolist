import {Todolist} from '../App';
import {v1} from "uuid";


 export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>// определить типа который  возвращает deleteTodolistAC
 export type CreateTodolist = ReturnType<typeof createTodolistAC>

 type ActionType = DeleteTodolistAction | CreateTodolist

const initialState: Todolist[] = [];

export const todolistsReducer = (todolists: Todolist[] = initialState, action : ActionType): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return todolists.filter(tl => tl.id !== action.payload.id);
        }
        case 'create_todolist': {
            return [...todolists, {id: action.payload.id, title: action.payload.title, filter: "All"}]
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

