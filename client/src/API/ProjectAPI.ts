import { current } from '@reduxjs/toolkit';
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
      query({ projectId, roadMapData }) {
        return {
          url: `/${projectId}/roadMap`,
          method: 'PATCH',
          body: roadMapData,
        };
      },
      async onQueryStarted(
        { projectId, roadMapData },
        { dispatch, queryFulfilled },
      ) {
        const id = Math.random().toString(36);

        const RoadMapResult = dispatch(
          ProjectApi.util.updateQueryData(
            'GetProjectId',
            projectId,
            (data: IProject) => {
              data.roadMap.push({ ...roadMapData, progress: 0, _id: id });
              return data;
            },
          ),
        );
        try {
          const { data: RoadMap } = await queryFulfilled;
          // Add Alert
        } catch {
          RoadMapResult.undo();
        }
      },
    }),
    RemoveRoadMap: builder.mutation({
      query({ projectId, RoadMapId }) {
        return {
          url: `/${projectId}/roadMap/${RoadMapId}`,
          method: 'delete',
        };
      },
      onQueryStarted({ projectId, RoadMapId }, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          ProjectApi.util.updateQueryData(
            'GetProjectId',
            projectId,
            (data: IProject) => {
              const NewRoadMap = data.roadMap.filter(
                (item: any) => item._id !== RoadMapId,
              );
              data.roadMap = NewRoadMap;
              return data;
            },
          ),
        );

        queryFulfilled.catch(deleteResult.undo);
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
