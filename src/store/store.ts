import { configureStore } from '@reduxjs/toolkit';
import { boardAPI } from '../services/boardAPI';
import { columnAPI } from '../services/columnAPI';
import { taskAPI } from '../services/taskAPI';
import basisSlice from './reducers/basisSlice';
import userSlice from './reducers/userSlice';
import draggingSlice from './reducers/draggingSlice';

export const store = configureStore({
  reducer: {
    [boardAPI.reducerPath]: boardAPI.reducer,
    [columnAPI.reducerPath]: columnAPI.reducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
    basis: basisSlice,
    user: userSlice,
    dragging: draggingSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      boardAPI.middleware,
      columnAPI.middleware,
      taskAPI.middleware
    );
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
