import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import API from '.';
import { setAuth } from '../features/AuthSlice';
import { setUser, setError } from '../features/UserSlice';
import type { IUser } from '../interface';

const UserApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${API}/user`, credentials: 'include' }),
  endpoints: (builder) => ({
    GetUser: builder.query<IUser, undefined>({
      query: () => ({
        url: '/me',
        method: 'get',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setAuth());
          sessionStorage.setItem('user', JSON.stringify(data));
        } catch (error: any) {
          const errorMessage = error.error.data.msg || 'server Error';
          setError(errorMessage);
        }
      },
    }),
    UpdateUser: builder.mutation<
      {
        user: IUser;
        message: string;
      },
      {
        password: string;
      }
    >({
      query: (Data) => ({
        url: '/me',
        method: 'PUT',
        body: Data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.message, {
            closeButton: true,
            autoClose: 3000,
          });
          sessionStorage.setItem('user', JSON.stringify(data.user));
        } catch (error: any) {
          const errorMessage = error.error.data.msg || 'server Error';
          setError(errorMessage);
        }
      },
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation: useUpdateUser } =
  UserApi;
export default UserApi;

// api/users/me
