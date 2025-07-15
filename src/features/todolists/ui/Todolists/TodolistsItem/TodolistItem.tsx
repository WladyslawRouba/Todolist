
import {createTaskAC} from '@/features/todolists/model/tasks-reducer.ts'
import { CreateItemForm } from "@/CreateItemForm.tsx";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistsItem/TodolistTitle /TodolistTitle.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistsItem/FilterButtons /FilterButtons.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistsItem/Tasks /Tasks.tsx";


type TodolistItemPropsType = {
    todolist: Todolist
}
export const TodolistItem = ({ todolist}: TodolistItemPropsType) => {
    const { id: todolistId } = todolist;

    const createTaskHandler = (title: string) => {
        dispatch(createTaskAC({ todolistId, title }))
    }
    const dispatch = useAppDispatch()
    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm createItem={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}
