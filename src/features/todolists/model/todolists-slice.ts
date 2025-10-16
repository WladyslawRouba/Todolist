import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import type { Todolist } from "@/features/todolists/api/todolistsApi.types"
import { createAppSlice } from "@/common/utils"
import {changeStatusAC, RequestStatus, setAppErrorAC} from "@/app/app-slice.ts";
import { ResultCodes } from "@/common/enums";

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },

  reducers: (create) => ({

    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
      changeTodolistEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
          const todolist = state.find((todolist) => todolist.id === action.payload.id)
          if (todolist) {
              todolist.entityStatus = action.payload.entityStatus
          }
      }),

      //Thunk
    fetchTodolistsTC: create.asyncThunk(async (_, {dispatch, rejectWithValue}) => {
      try {
          dispatch(changeStatusAC({status:"loading"}))
        const res = await todolistsApi.getTodolists()

          dispatch(changeStatusAC({status:"succeeded"}))
        return {todolists: res.data}

      } catch (error) {
        return rejectWithValue(error)
      }

  }, {
      fulfilled: (_state, action)=>{
          if (!action.payload?.todolists) return
          return action.payload?.todolists.map((tl) => {
         return({ ...tl, filter: "all", entityStatus: "idle" })
        })
      },
    }),
      createTodolist: create.asyncThunk(async (arg: { title: string }, {dispatch, rejectWithValue}) => {
              try {
                  const res = await todolistsApi.createTodolist(arg.title)
                  if (res.data.resultCode === ResultCodes.Success) {
                      dispatch(changeStatusAC({status:"succeeded"}))
                      return {todolist: res.data.data.item}
                  } else {
                      dispatch(setAppErrorAC({error: res.data.messages[0]}))
                      dispatch(changeStatusAC({status:"failed"}))
                      return rejectWithValue(null)
                  }
              } catch (error) {
                  dispatch(changeStatusAC({status:"failed"}))
                  return rejectWithValue(null)
              }
          }, {
              fulfilled: (state, action) => {
                  if (!action.payload?.todolist) return
                  state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
              }
          }
      ),
      deleteTodolist: create.asyncThunk(async (arg:{id: string}, {dispatch, rejectWithValue}) => {
              try {
                  dispatch(changeTodolistEntityStatusAC({entityStatus:"loading", id:arg.id}) )
                  await todolistsApi.deleteTodolist(arg.id)
                  return { id:arg.id }
              } catch (error) {
                 dispatch(changeStatusAC({status:"failed"}))
                  dispatch(changeTodolistEntityStatusAC({entityStatus:"succeeded", id:arg.id}) )
                  return rejectWithValue(null)
              }
          },{
          fulfilled: (state, action) => {
              if (!action.payload?.id) return
              const index = state.findIndex((todolist) => todolist.id === action.payload.id)
              if (index !== -1) {
                  state.splice(index, 1)
              }
          }
          }
      ),
        changeTodolistTitle: create.asyncThunk(async (arg: { id: string; title: string }, thunkAPI) => {
              try {
                  await todolistsApi.changeTodolistTitle(arg)
                  return arg
              } catch (error) {
                  return thunkAPI.rejectWithValue(null)
              }
          },
            {
                fulfilled: (state, action) => {
                    const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state[index].title = action.payload.title
                    }
                }
            }
      )
  }),
})

export const { selectTodolists } = todolistsSlice.selectors
export const { changeTodolistFilterAC, fetchTodolistsTC, createTodolist, deleteTodolist,changeTodolistTitle,changeTodolistEntityStatusAC } = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

export type DomainTodolist = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"
