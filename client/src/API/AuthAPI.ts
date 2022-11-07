import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setError } from '../features/AuthSlice';
import { setUser } from '../features/UserSlice';
import type { IUser } from '../interface';
import type { AuthUserResponse } from './interface';
import API from '.';
import { CheckError } from '../utils/helpers';

const AuthApi = createApi({
  reducerPath: 'AuthAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),

  endpoints: (builder) => ({
    LoginUser: builder.mutation<AuthUserResponse, Partial<IUser>>({
      query(data) {
        return {
          url: '/login',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch (error: any) {
          const ErrorMessage = CheckError(error);
          dispatch(setError(ErrorMessage));
        }
      },
    }),
    RegisterUser: builder.mutation<AuthUserResponse, Partial<any>>({
      query(data) {
        return {
          url: '/register',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch (error: any) {
          const ErrorMessage = CheckError(error);
          dispatch(setError(ErrorMessage));
        }
      },
    }),
  }),
});

export const {
  useLoginUserMutation: useLogin,
  useRegisterUserMutation: useRegister,
} = AuthApi;
export default AuthApi;
