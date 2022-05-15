import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken } from '../features/AuthSlice';
import { setUser, setError } from '../features/UserSlice';

const UserApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/user' }),
  endpoints: (builder) => ({
    GetUser: builder.query({
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
