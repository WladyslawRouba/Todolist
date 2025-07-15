import {List} from "@mui/material";
import { taskType} from "@/features/todolists/model/tasks-reducer.ts";

import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistsItem/Tasks /TaskItem/TaskItem.tsx";

type TodolistItemPropsType = {
    todolist: Todolist
}
export const Tasks = ({ todolist}: TodolistItemPropsType) => {
    const { id,  filter } = todolist;
    const tasks = useAppSelector(selectTasks)

    let filteredTasks = tasks[todolist.id];

    if (filter === "Active") {
        filteredTasks = filteredTasks.filter((task: taskType) => !task.isDone);
    }
    if (filter === "Completed") {
        filteredTasks = filteredTasks.filter((task: taskType) => task.isDone);
    }
    return (
        <List>

            {filteredTasks.map((task: taskType)=> {
            return <TaskItem key={task.id} task={task} todolistId={id}/>

            })}
        </List>
    )
}