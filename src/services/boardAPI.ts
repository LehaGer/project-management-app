import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API } from '../constants/appConstants';
import { RootStateType } from '../store/store';
import { IBoard, ICreateBoardDto, IUpdateBoardDto } from '../types/IBoard';

interface IUpdateBoardQueryArgument extends IUpdateBoardDto {
  boardId: string;
}

export const boardAPI = createApi({
  reducerPath: 'boardAPI',

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_API,
    prepareHeaders: (headers, api) => {
      const state = api.getState() as RootStateType;
      headers.set('Accept', 'application/json');
      headers.set('Authorization', `Bearer ${state.basis.token}`);
      return headers;
    },
  }),

  tagTypes: ['Board'],

  endpoints: (builder) => ({
    getAllBoards: builder.query<Array<IBoard>, void>({
      query: () => '/boards',
      providesTags: ['Board'],
    }),

    createBoard: builder.mutation<IBoard, ICreateBoardDto>({
      query: (board) => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
      invalidatesTags: ['Board'],
    }),

    getBoard: builder.query<IBoard, string>({
      query: (boardId) => `/boards/${boardId}`,
      providesTags: ['Board'],
    }),

    deleteBoard: builder.mutation<void, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),

    updateBoard: builder.mutation<IBoard, IUpdateBoardQueryArgument>({
      query: ({ boardId, title, description }) => ({
        url: `/boards/${boardId}`,
        method: 'PUT',
        body: { title, description },
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});
