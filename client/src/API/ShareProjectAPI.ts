import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ISharedProjectReposes } from '../interface';
import type { RootState } from '../store';
import API from '.';

const ShareProjectApi = createApi({
  reducerPath: 'ShareProjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/shareProject`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).Auth;
      if (token) {
        headers.set('x-auth-token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['ProjectToken'],
  endpoints: (builder) => ({
    CreateToken: builder.mutation<
      {
        message: string;
        token: string;
      },
      {
        ProjectId: string;
        expireDate: string;
      }
    >({
      query: ({ ProjectId, expireDate }) => ({
        url: `/`,
        method: 'POST',
        body: {
          projectId: ProjectId,
          expirationTime: expireDate,
        },
      }),
    }),
    GetToken: builder.query<
      {
        token: string;
        expirationTime: string;
      },
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags(result, error, id) {
        if (result) {
          return [{ type: 'ProjectToken', id }];
        }
        return ['ProjectToken'];
      },
    }),
    GetSharedProject: builder.query<ISharedProjectReposes, string>({
      query: (token) => ({
        url: '',
        method: 'GET',
        headers: {
          'shared-token': token,
        },
      }),
    }),
    DeleteSharedToken: builder.mutation<
      {
        acknowledged: boolean;
        deletedCount: number;
      },
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => {
        if (result) {
          return [{ type: 'ProjectToken', id }];
        }
        return ['ProjectToken'];
      },
    }),
  }),
});

export const {
  useDeleteSharedTokenMutation: useDeleteSharedToken,
  useGetSharedProjectQuery: useGetSharedProject,
  useGetTokenQuery: useGetToken,
  useCreateTokenMutation: useCreateToken,
} = ShareProjectApi;

export default ShareProjectApi;
