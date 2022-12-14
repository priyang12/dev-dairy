import type { Store } from '@reduxjs/toolkit/';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import AuthApi from './API/AuthAPI';
import TestUserAPI from './API/TestUserAPI';
import PostApi from './API/PostAPI';
import UserApi from './API/UserAPI';
import ProjectApi from './API/ProjectAPI';
import ShareProjectApi from './API/ShareProjectAPI';
import WorkSessionApi from './API/WorkSessionsAPI';
import AuthReducer from './features/AuthSlice';
import UserReducer from './features/UserSlice';
import MusicReducer from './features/MusicSlice';
import WorkSessionReducer from './features/WorkSessionSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Music'],
};

const RootReducers = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [TestUserAPI.reducerPath]: TestUserAPI.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [PostApi.reducerPath]: PostApi.reducer,
  [ProjectApi.reducerPath]: ProjectApi.reducer,
  [WorkSessionApi.reducerPath]: WorkSessionApi.reducer,
  [ShareProjectApi.reducerPath]: ShareProjectApi.reducer,
  Auth: AuthReducer,
  User: UserReducer,
  Music: MusicReducer,
  WorkSession: WorkSessionReducer,
});

export type StoreState = ReturnType<typeof RootReducers>;

const persistedReducer = persistReducer(persistConfig, RootReducers);

export const createStoreWithMiddleware = (initialState = {}): Store =>
  configureStore({
    reducer: persistedReducer,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(AuthApi.middleware)
        .concat(TestUserAPI.middleware)
        .concat(UserApi.middleware)
        .concat(PostApi.middleware)
        .concat(ProjectApi.middleware)
        .concat(ShareProjectApi.middleware)
        .concat(WorkSessionApi.middleware),
  });

export const store = createStoreWithMiddleware();

export const Persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
