import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API from '.';
import {
  setError,
  setProjects,
  setProject,
  setAlert,
} from '../features/ProjectSlice';
import type { IProject } from '../interface';
import type { RootState } from '../store';

const ProjectApi = createApi({
  reducerPath: 'ProjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/projects`,
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
    GetProjectId: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'get',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProject(data));
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
      query(id) {
        return {
          url: `/${id}`,
          method: 'delete',
        };
      },
      async onQueryStarted(id, { dispatch, getState, queryFulfilled }) {
        const state = getState() as RootState;
        const { projects } = state.Project;
        const NewProjects = projects.filter(
          (project: IProject) => project._id !== id,
        );

        dispatch(setProjects(NewProjects));
        try {
          const { data } = await queryFulfilled;
          dispatch(setAlert(data));
        } catch (error: any) {
          const errorMessage = error.error.data.msg || 'server Error';
          setError(errorMessage);
        }
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
  useGetProjectIdQuery,
  useAddRoadMapMutation,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useRemoveRoadMapMutation,
} = ProjectApi;

export default ProjectApi;
