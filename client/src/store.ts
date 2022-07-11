import type { Store } from '@reduxjs/toolkit/';
import { configureStore, combineReducers } from '@reduxjs/toolkit/';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthApi from './API/AuthAPI';
import PostApi from './API/PostAPI';
import UserApi from './API/UserAPI';
import ProjectApi from './API/ProjectAPI';
import AuthReducer from './features/AuthSlice';
import UserReducer from './features/UserSlice';
import AlertReducer from './features/AlertSlice';
import MusicReducer from './features/MusicSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Music'],
};

const RootReducers = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [PostApi.reducerPath]: PostApi.reducer,
  [ProjectApi.reducerPath]: ProjectApi.reducer,
  Auth: AuthReducer,
  User: UserReducer,
  Alert: AlertReducer,
  Music: MusicReducer,
});

const persistedReducer = persistReducer(persistConfig, RootReducers);

export const createStoreWithMiddleware = (initialState = {}): Store =>
  configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(AuthApi.middleware)
        .concat(UserApi.middleware)
        .concat(PostApi.middleware)
        .concat(ProjectApi.middleware),
  });

export const store = createStoreWithMiddleware();

export const Persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
