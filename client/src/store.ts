import type { Store } from '@reduxjs/toolkit/';
import { configureStore } from '@reduxjs/toolkit/';
import AuthApi from './API/AuthAPI';
import PostApi from './API/PostAPI';
import UserApi from './API/UserAPI';
import ProjectApi from './API/ProjectAPI';
import AuthReducer from './features/AuthSlice';
import UserReducer from './features/UserSlice';

const RootReducers = {
  [AuthApi.reducerPath]: AuthApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [PostApi.reducerPath]: PostApi.reducer,
  [ProjectApi.reducerPath]: ProjectApi.reducer,
  Auth: AuthReducer,
  User: UserReducer,
};

export const createStoreWithMiddleware = (initialState = {}): Store =>
  configureStore({
    reducer: RootReducers,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(AuthApi.middleware)
        .concat(UserApi.middleware)
        .concat(PostApi.middleware)
        .concat(ProjectApi.middleware),
  });

const store = createStoreWithMiddleware();

export type RootState = ReturnType<typeof store.getState>;
