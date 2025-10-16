
import {createAppSlice} from "@/common/utils"
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";
import {DomainTask, UpdateTaskModel} from "@/features/todolists/api/tasksApi.types.ts";
import {changeStatusAC} from "@/app/app-slice.ts";

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },

  reducers: (create) => ({

    //thunks
    fetchTasks: create.asyncThunk(async( todolistId: string ,{ dispatch, rejectWithValue}) => {
      try{
        dispatch(changeStatusAC({status:"loading"}))
        const res = await  tasksApi.getTasks(todolistId)
        dispatch(changeStatusAC({status:"succeeded"}))

        return {tasks: res.data.items, todolistId}
      } catch(error){
return rejectWithValue(error)
      }
    }, {
      fulfilled: (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks

      }
    }),
    createTask: create.asyncThunk(async( arg:{todolistId: string, title: string}  , { dispatch, rejectWithValue}) => {
      try{
        dispatch(changeStatusAC({status:"loading"}))

        const res = await  tasksApi.createTask(arg)
        dispatch(changeStatusAC({status:"succeeded"}))
        return {task: res.data.data.item}
      } catch(error){
        return rejectWithValue(null)
      }
    }, {
      fulfilled: (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task)
      }
    }),
    deleteTask: create.asyncThunk(async(args : { todolistId: string, taskId: string } , thunkAPI) => {
      try{
        await  tasksApi.deleteTask(args)
        return args
      } catch(error){
        return thunkAPI.rejectWithValue(null)
      }
    }, {
      fulfilled: (state, action) => {
     /*   state[action.payload.todolistId] = action.payload.tasks*/
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      }
    }),
    changeTaskStatus: create.asyncThunk(async (task: DomainTask, thunkAPI) => {
      try {
        const model: UpdateTaskModel = {
          status: task.status,
          title: task.title,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
          description: task.description,

        }
         const res =await  tasksApi.updateTask({todolistId: task.todoListId, taskId: task.id, model })
         return {task: res.data.data.item}
      } catch (error) {
        return thunkAPI.rejectWithValue(null)
      }
    }, {
      fulfilled: (state, action) => {
        const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
        if (task) {
          task.status = action.payload.task.status
        }

      },

    }),
    changeTaskTitle: create.asyncThunk(async ( task: DomainTask, thunkAPI) => {
      try{
        const model: UpdateTaskModel = {
          title: task.title,
          description: task.description,      // если нужно, можно брать из state
          status: task.status, // можно тоже взять из state
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
        }
        const res = await tasksApi.updateTask({
          todolistId: task.todoListId,
          taskId: task.id,
          model,
        })

        return { task: res.data.data.item }
      } catch(error){
       return  thunkAPI.rejectWithValue(null)
      }
    },{
      fulfilled: (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        const task = tasks.find((task) => task.id === action.payload.task.id)
        if (task) {
          task.title = action.payload.task.title
        }
      }
    }),
  }),
})

export const { selectTasks } = tasksSlice.selectors
export const { deleteTask, createTask, changeTaskStatus, changeTaskTitle,fetchTasks } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer



export type TasksState = Record<string, DomainTask[]>
