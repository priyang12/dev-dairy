import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API from '.';
import { setUser, setError } from '../features/UserSlice';
import type { IUser } from '../interface';

const UserApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${API}/user` }),
  endpoints: (builder) => ({
    GetUser: builder.query<IUser, Partial<string>>({
      query: (token) => ({
        url: '/me',
        method: 'get',
        headers: {
          'x-auth-token': token,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));

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
