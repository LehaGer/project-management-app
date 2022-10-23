import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IColumnDragState {
  state: boolean;
  columnId?: string;
  title?: string;
  order?: number;
}

interface ITaskDragState {
  state: boolean;
  columnId?: string;
  taskId?: string;
  userId?: string;
  title?: string;
  description?: string;
}

interface IDraggingState {
  columnDragState: IColumnDragState;
  taskDragState: ITaskDragState;
}

const initialState: IDraggingState = {
  columnDragState: {
    state: false,
  },
  taskDragState: {
    state: false,
  },
};

const userSlice = createSlice({
  name: 'dragging',
  initialState,
  reducers: {
    setColumnDragState: (state, action: PayloadAction<IColumnDragState>) => {
      state.columnDragState = action.payload;
    },
    setTaskDragState: (state, action: PayloadAction<ITaskDragState>) => {
      state.taskDragState = action.payload;
    },
  },
});

export const { setColumnDragState, setTaskDragState } = userSlice.actions;
export default userSlice.reducer;
