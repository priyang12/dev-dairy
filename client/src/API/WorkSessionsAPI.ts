import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type { ISession, IWorkSessions } from '../interface';
import API from '.';

const SessionsApi = createApi({
  reducerPath: 'SessionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/workSession`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).Auth;
      if (token) {
        headers.set('x-auth-token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Sessions'],
  endpoints: (builder) => ({
    GetSessions: builder.query<IWorkSessions[], Partial<void>>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['Sessions'],
    }),
    DeleteAll: builder.mutation<
      {
        result: boolean;
        message: string;
      },
      Partial<void>
    >({
      query: () => ({
        url: '',
        method: 'DELETE',
      }),
      invalidatesTags: ['Sessions'],
    }),
  }),
});

export const { useGetSessionsQuery, useDeleteAllMutation } = SessionsApi;

export default SessionsApi;
