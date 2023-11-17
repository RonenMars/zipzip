import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from '@redux/UserReducer';
import LoaderReducer from '@redux/LoaderReducer';
import ModalsReducer from '@redux/ModalsReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const rootReducers = combineReducers({
  user: UserReducer,
  loader: LoaderReducer,
  modals: ModalsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
