import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API from '.';
import { setAlert, setError, setProjects } from '../features/ProjectSlice';
import type { RootState } from '../store';

const ProjectApi = createApi({
  reducerPath: 'ProjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/project`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).Auth;
      if (token) {
        headers.set('x-auth-token', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetProjects: builder.query({
      query: () => ({
        url: '',
        method: 'get',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProjects(data));
        } catch (error: any) {
          const errorMessage = error.error.data.msg || 'server Error';
          setError(errorMessage);
        }
      },
    }),
    CreateProject: builder.mutation({
      query(data) {
        return {
          url: '',
          method: 'post',
          body: data,
        };
      },
    }),
    UpdateProject: builder.mutation({
      query(data) {
        return {
          url: '',
          method: 'put',
          body: data,
        };
      },
    }),
    DeleteProject: builder.mutation({
      query(data) {
        return {
          url: '',
          method: 'delete',
          body: data,
        };
      },
    }),
    AddRoadMap: builder.mutation({
      query(data) {
        return {
          url: '/:id/roadMap',
          method: 'put',
          body: data,
        };
      },
    }),
    RemoveRoadMap: builder.mutation({
      query(data) {
        return {
          url: '/:id/roadMap',
          method: 'delete',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddRoadMapMutation,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useRemoveRoadMapMutation,
} = ProjectApi;

export default ProjectApi;
