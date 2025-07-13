
import {createTaskAC} from '@/model/tasks-reducer.ts'
import { CreateItemForm } from "./CreateItemForm.tsx";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import {Todolist} from "@/model/todolists-reducer.ts";
import {TodolistTitle} from "@/TodolistTitle.tsx";
import {FilterButtons} from "@/FilterButtons.tsx";
import {Tasks} from "@/Tasks.tsx";


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
