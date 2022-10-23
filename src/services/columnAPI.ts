import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL_API } from '../constants/appConstants';
import { RootStateType } from '../store/store';
import { IColumn, IColumns, ICreateColumnDto, IUpdateColumnDto } from '../types/IColumn';

interface ICreateColumnQueryArgument extends ICreateColumnDto {
  boardId: string;
}

interface IGetColumnQueryArgument {
  boardId: string;
  columnId: string;
}

interface IDeleteColumnQueryArgument {
  boardId: string;
  columnId: string;
}

interface IUpdateColumnQueryArgument extends IUpdateColumnDto {
  boardId: string;
  columnId: string;
}

export const columnAPI = createApi({
  reducerPath: 'columnAPI',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    prepareHeaders: (headers, api) => {
      const state = api.getState() as RootStateType;
      headers.set('Accept', 'application/json');
      headers.set('Authorization', `Bearer ${state.basis.token}`);
      return headers;
    },
  }),

  tagTypes: ['Column'],

  endpoints: (builder) => ({
    getAllColumns: builder.query<Array<IColumns>, string>({
      query: (boardId) => `/boards/${boardId}/columns`,
      providesTags: ['Column'],
    }),

    createColumn: builder.mutation<IColumns, ICreateColumnQueryArgument>({
      query: ({ boardId, title }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Column'],
    }),

    getColumn: builder.query<IColumn, IGetColumnQueryArgument>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}`,
      providesTags: ['Column'],
    }),

    deleteColumn: builder.mutation<void, IDeleteColumnQueryArgument>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Column'],
    }),

    updateColumn: builder.mutation<IColumns, IUpdateColumnQueryArgument>({
      query: ({ boardId, columnId, title, order }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: { title, order },
      }),
      invalidatesTags: ['Column'],
    }),
  }),
});
