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
import PostApi from './API/PostAPI';
import UserApi from './API/UserAPI';
import ProjectApi from './API/ProjectAPI';
import WorkSessionApi from './API/WorkSessionsAPI';
import AuthReducer from './features/AuthSlice';
import UserReducer from './features/UserSlice';
import AlertReducer from './features/AlertSlice';
import MusicReducer from './features/MusicSlice';
import WorkSessionReducer from './features/WorkSessionSlice';

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
  [WorkSessionApi.reducerPath]: WorkSessionApi.reducer,
  Auth: AuthReducer,
  User: UserReducer,
  Alert: AlertReducer,
  Music: MusicReducer,
  WorkSession: WorkSessionReducer,
});

export type StoreState = ReturnType<typeof RootReducers>;

const persistedReducer = persistReducer(persistConfig, RootReducers);

export const createStoreWithMiddleware = (initialState = {}): Store => configureStore({
  reducer: persistedReducer,
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
    .concat(AuthApi.middleware)
    .concat(UserApi.middleware)
    .concat(PostApi.middleware)
    .concat(ProjectApi.middleware)
    .concat(WorkSessionApi.middleware),
});

export const store = createStoreWithMiddleware();

export const Persister = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
