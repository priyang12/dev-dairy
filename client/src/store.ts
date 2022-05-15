import type { Store } from '@reduxjs/toolkit/';
import { combineReducers, configureStore } from '@reduxjs/toolkit/';

import AuthApi from './API/AuthAPI';
import PostApi from './API/PostAPI';
import UserApi from './API/UserAPI';
import AuthReducer from './features/AuthSlice';
import UserReducer from './features/UserSlice';
import PostReducer from './features/PostSlice';

const RootReducers = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [UserApi.reducerPath]: UserApi.reducer,
  [PostApi.reducerPath]: PostApi.reducer,
  Auth: AuthReducer,
  User: UserReducer,
  Post: PostReducer,
});

export const createStoreWithMiddleware = (initialState = {}): Store =>
  configureStore({
    reducer: RootReducers,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(AuthApi.middleware)
        .concat(UserApi.middleware)
        .concat(PostApi.middleware),
  });

const store = createStoreWithMiddleware();

export type RootState = ReturnType<typeof store.getState>;
