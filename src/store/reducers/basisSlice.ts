import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBasisState {
  language: string;
  token: string;
  userId: string;
  isAuth: boolean;
}

const authData = JSON.parse(localStorage.getItem('authData') ?? '{}');

const initialState: IBasisState = {
  language: 'en',
  token: authData?.token ?? '',
  userId: authData?.userId ?? '',
  isAuth: authData?.isAuth ?? false,
};

const basisSlice = createSlice({
  name: 'basis',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setLanguage, setToken, setUserId, setIsAuth } = basisSlice.actions;
export default basisSlice.reducer;
