import {TodolistTitle} from "./TodolistTitle.tsx";
import {Button} from "./Button.tsx";
import { FilterValues} from "./App.tsx";
type TodolistItemPropsType = {
    title: string
    tasks: taskType[]
    deleteTask: (id: number) => void
    changeFilter: (filter: FilterValues) => void
}
 export type taskType = {
    id: number
    title: string
    isDone: boolean
}
export const TodolistItem = ({title, tasks, deleteTask, changeFilter}: TodolistItemPropsType)=> {
    //1. const title = props.title
   // const tasks = props.tasks
   // 2. const{title: title, tasks: tasks } = props
   // 3. const{title, tasks} = props
    const tasksItems = tasks.map(task => {
        return(
            <li>
                <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                <Button onClick= {()=> deleteTask(task.id)} title= "x"/>
            </li>
        )
    })
    return (
           <div>
           <TodolistTitle title={title}/>

            <div>
                <input/>
                <Button title = "+"/>
            </div>
            <ul>
                {tasksItems}

            </ul>
            <div>
                <Button title= "Add" onClick ={()=> changeFilter("All")}/>
                <Button title= "Active" onClick={()=> changeFilter("Active")}/>
                <Button title= "Complited" onClick={()=> changeFilter("Completed")}/>
            </div>
        </div>
    )
}