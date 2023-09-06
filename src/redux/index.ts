import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '@redux/UserReducer';
import LoaderReducer from '@redux/LoaderReducer.ts';
export const store = configureStore({
  reducer: {
    user: UserReducer,
    loader: LoaderReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
