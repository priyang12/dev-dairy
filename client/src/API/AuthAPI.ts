import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken, setError } from '../features/AuthSlice';
import { setUser } from '../features/UserSlice';
import API from '.';

const AuthApi = createApi({
  reducerPath: 'AuthAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API }),

  endpoints: (builder) => ({
    LoginUser: builder.mutation<any, Partial<any>>({
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
          dispatch(setToken(data.token));
          dispatch(setUser(data.user));
        } catch (error: any) {
          console.log(error.error);
          const ErrorMessage = error.error.data.message || 'Server Error';

          dispatch(setError(ErrorMessage));
        }
      },
    }),
    RegisterUser: builder.mutation<any, Partial<any>>({
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
          dispatch(setToken(data.token));
          dispatch(setUser(data.user));
        } catch (error) {
          dispatch(setError(error));
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = AuthApi;
export default AuthApi;
