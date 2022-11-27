import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { setError } from '../features/AuthSlice';
import { setUser } from '../features/UserSlice';
import API from '.';
import { CheckError } from '../utils/helpers';

const TestUserApi = createApi({
  reducerPath: 'TestUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    GetToken: builder.query<{ token: string }, string>({
      query(UUID) {
        return {
          url: `/seed?id=${UUID}`,
          method: 'GET',
        };
      },
      async onQueryStarted(UUID, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          const ErrorMessage = CheckError(error);
          localStorage.removeItem('TestID');
          dispatch(setError(ErrorMessage));
        }
      },
    }),
    RegisterTestUser: builder.mutation<{ token: string }, { UUID: string }>({
      query(data) {
        return {
          url: '/seed',
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.setItem('TestID', args.UUID);
        } catch (error) {
          const ErrorMessage = CheckError(error);
          dispatch(setError(ErrorMessage));
        }
      },
    }),
  }),
});

export const {
  useGetTokenQuery: useGetTestTokens,
  useRegisterTestUserMutation: useRegisterTestUser,
} = TestUserApi;
export default TestUserApi;
