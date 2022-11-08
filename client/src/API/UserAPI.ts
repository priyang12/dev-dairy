import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
  }),
});

export const { useGetUserQuery } = UserApi;
export default UserApi;
