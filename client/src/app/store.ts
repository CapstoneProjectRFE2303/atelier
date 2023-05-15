import { Action, AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { ThunkAction as BaseThunkAction } from 'redux-thunk';

import { api } from '../api/api';
import { productDetailSlice } from '../features/productDetail/productDetailSlice';

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = BaseThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export const store = configureStore({
  reducer: {
    productDetail: productDetailSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
