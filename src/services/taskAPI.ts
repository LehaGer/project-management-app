import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL_API } from '../constants/appConstants';
import { RootStateType } from '../store/store';
import { ICreateTaskDto, ITask, IUpdateTaskDto } from '../types/ITask';

interface IGetAllTasksQueryArgument {
  boardId: string;
  columnId: string;
}

interface ICreateTaskQueryArgument extends ICreateTaskDto {
  boardId: string;
  columnId: string;
}

interface IGetTaskQueryArgument {
  boardId: string;
  columnId: string;
  taskId: string;
}

interface IDeleteTaskQueryArgument {
  boardId: string;
  columnId: string;
  taskId: string;
}

interface IUpdateTaskQueryArgument extends IUpdateTaskDto {
  taskId: string;
}

interface IUpdateTaskPositionQueryArgument extends IUpdateTaskDto {
  taskId: string;
  newColumnId: string;
}

export const taskAPI = createApi({
  reducerPath: 'taskAPI',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    prepareHeaders: (headers, api) => {
      const state = api.getState() as RootStateType;
      headers.set('Accept', 'application/json');
      headers.set('Authorization', `Bearer ${state.basis.token}`);
      return headers;
    },
  }),

  tagTypes: ['Task'],

  endpoints: (builder) => ({
    getAllTasks: builder.query<Array<ITask>, IGetAllTasksQueryArgument>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}/tasks`,
      providesTags: ['Task'],
    }),

    createTask: builder.mutation<ITask, ICreateTaskQueryArgument>({
      query: ({ boardId, columnId, title, description, userId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: { title, description, userId },
      }),
      invalidatesTags: ['Task'],
    }),

    getTask: builder.query<ITask, IGetTaskQueryArgument>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      }),
      providesTags: ['Task'],
    }),

    deleteTask: builder.mutation<void, IDeleteTaskQueryArgument>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),

    updateTask: builder.mutation<ITask, IUpdateTaskQueryArgument>({
      query: ({ boardId, columnId, taskId, userId, title, order, description }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: { boardId, columnId, userId, title, order, description },
      }),
      invalidatesTags: ['Task'],
    }),

    updateTaskPosition: builder.mutation<ITask, IUpdateTaskPositionQueryArgument>({
      query: ({ boardId, columnId, taskId, userId, title, description, order, newColumnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: { boardId, columnId: newColumnId, userId, title, order, description },
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});
