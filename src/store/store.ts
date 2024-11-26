import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/apiSlice';
import { authReducer } from './slices/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteReducer } from './slices/Favorite';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistCombineReducers,
} from 'redux-persist';
//persist

import { persistConfig } from './persist/persist';

const rootReducer = persistCombineReducers(persistConfig, {
  auth: authReducer,
  favorite: favoriteReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
