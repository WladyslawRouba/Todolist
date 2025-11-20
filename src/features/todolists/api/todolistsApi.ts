import { instance } from "@/common/instance"
import type { BaseResponse } from "@/common/types"
import type { Todolist } from "./todolistsApi.types"
import {DomainTodolist} from "@/features/todolists/model/todolists-slice.ts";
import {baseApi} from "@/app/baseApi.ts";


export const todolistsApi = baseApi.injectEndpoints({

  endpoints: (builder) => {
    return {
      getTodolists: builder.query<DomainTodolist[], void>({
        query: () => {
          return {
            method: 'GET',
            url: '/todo-lists',
          }

        },
        transformResponse: (todolists: Todolist[]) => {
          return todolists.map(todolist => {
            return {...todolist, filter: "all", entityStatus: "idle"}

          })
        },
        providesTags: ['TodoLists'],
      }),
      createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
        query: (title) => {
          return {
            method: 'POST',
            url: '/todo-lists',
            body: { title }
          }
        },
        invalidatesTags:['TodoLists']
      }),
      deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id) => {
        return {
          method: 'DELETE',
          url: `/todo-lists/${id}`,
        }
      },
        invalidatesTags:['TodoLists' ]
    }),
      changeTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
        query: ({id , title}) => {
          return {
            method: 'PUT',
            url: `/todo-lists/${id}`,
            body: { title }

          }
        },
        invalidatesTags:['TodoLists']
      })
    }
  },
})
export const{useGetTodolistsQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useChangeTodolistTitleMutation} = todolistsApi


export const _todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
