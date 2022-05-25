import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API from '.';
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
        method: 'GET',
      }),
    }),
    GetProjectId: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'get',
      }),
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
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          ProjectApi.util.updateQueryData('GetProjects', '', (data: any) => {
            const newData = data.filter((item: IProject) => item._id !== id);
            return newData;
          }),
        );

        queryFulfilled.catch(deleteResult.undo);
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
