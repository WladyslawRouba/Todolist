import {tasksState } from '../App.tsx';
import {CreateTodolistAction,  DeleteTodolistAction} from './todolists-reducer.ts';
import {v1} from "uuid";


export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>;
export type CreateTaskAction = ReturnType<typeof createTaskAC>;
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC >;
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC  >;



const initialState: tasksState = {}
type actionType = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction;

export const tasksReducer = (tasks: tasksState = initialState, action: actionType) => {
switch(action.type){
    case 'create_todolist':
        return {...tasks, [action.payload.id]: []}
    case 'delete_todolist':
          delete tasks[action.payload.id]
        return {...tasks}
    default:
        return tasks
    case 'delete_task':
        return {...tasks,[action.payload.todolistId]: tasks[action.payload.todolistId].filter((task) => task.id !== action.payload.taskId )}
    case "create_task":{
        const newTask = {id: v1(), title: action.payload.title, isDone: false}
        const todolistId = action.payload.todolistId
        return {...tasks, [todolistId] : [newTask, ...tasks[todolistId]]}
    }
    case 'change_task_status':{
        const {taskId, todolistId, isDone} = action.payload
        return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task) }
    }
    case 'change_task_title':{
        const {taskId, todolistId, title} = action.payload
        return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, title} : task) }
    }
}
}

export const deleteTaskAC = (payload: {taskId: string, todolistId: string}) => ({
    type: 'delete_task',
    payload
} as const);

export const createTaskAC = (payload: { todolistId: string, title: string}) => ({
    type: 'create_task',
    payload
} as const);
export const changeTaskStatusAC = (payload: { taskId: string, todolistId: string, isDone: boolean}) => ({
    type: 'change_task_status',
    payload
}as const);

export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => ({
    type: 'change_task_title',
    payload
}as const);


