import {RootState} from "@/app/store.ts";
import {Todolist} from "@/features/todolists/model/todolists-reducer";

export const selectTodolist = (state: RootState): Todolist[] => state.todolists