import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API from '.';
import { setAlert } from '../features/AlertSlice';
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
  tagTypes: ['projectId'],

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
        method: 'GET',
      }),
      providesTags: ['projectId'],
    }),
    GetProjectRoadMap: builder.query({
      query: ({ projectId, RoadMapId }) => ({
        url: `/${projectId}/roadMap/${RoadMapId}`,
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
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: NewProject } = await queryFulfilled;
          dispatch(
            ProjectApi.util.updateQueryData(
              'GetProjects',
              '',
              (projects: IProject[]) => [NewProject.project, ...projects],
            ),
          );
        } catch (error: any) {
          dispatch(setAlert(error.data.message));
        }
      },
    }),
    UpdateProject: builder.mutation({
      query(data) {
        return {
          url: `/${data.id}`,
          method: 'put',
          body: data,
        };
      },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: UpdatedProject } = await queryFulfilled;

          dispatch(
            ProjectApi.util.updateQueryData(
              'GetProjects',
              '',
              (projects: IProject[]) =>
                projects.map((project) =>
                  project._id === UpdatedProject.project._id
                    ? UpdatedProject.project
                    : project,
                ),
            ),
          );
        } catch (error: any) {
          dispatch(setAlert(error.data.message));
        }
      },
      invalidatesTags: ['projectId'],
    }),
    DeleteProject: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: 'delete',
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          ProjectApi.util.updateQueryData('GetProjects', '', (data: any) => {
            const newData = data.filter((item: IProject) => item._id !== id);
            return newData;
          }),
        );
        try {
          await queryFulfilled;
          dispatch(
            setAlert({
              alert: 'Project Deleted Successfully',
              result: true,
            }),
          );
        } catch (e: any) {
          deleteResult.undo();
          dispatch(
            setAlert({
              alert: e.error.data.message,
              result: false,
            }),
          );
        }
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
          const { data: resData } = await queryFulfilled;

          dispatch(
            setAlert({
              alert: 'New RoadMap Added',
              result: true,
            }),
          );

          dispatch(
            ProjectApi.util.updateQueryData(
              'GetProjectId',
              projectId,
              (data: IProject) => {
                data.roadMap.map((item: any) => {
                  if (item._id === id) {
                    item._id = resData.roadmap._id;
                  }
                  return item;
                });
                return data;
              },
            ),
          );
        } catch (e: any) {
          console.log(e);
          setAlert({
            alert: e.error.data.message,
            type: false,
          });
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

        queryFulfilled.catch(() => {
          dispatch(setAlert('Server Error'));
          deleteResult.undo();
        });
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  usePrefetch,
  useGetProjectIdQuery,
  useAddRoadMapMutation,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useRemoveRoadMapMutation,
} = ProjectApi;

export default ProjectApi;
