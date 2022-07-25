import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API from '.';
import { setAlert } from '../features/AlertSlice';
import type { IProject, IRoadMap } from '../interface';
import type { RootState } from '../store';
import type { DeletedProjectAPI, NewProjectAPI } from './interface';

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
  tagTypes: ['projectId', 'RoadMapsId'],

  endpoints: (builder) => ({
    GetProjects: builder.query<IProject[], Partial<string>>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),

    GetProjectId: builder.query<IProject, Partial<string | undefined>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['projectId'],
    }),
    GetProjectRoadMap: builder.query<
      IProject,
      Partial<{
        projectId: string;
        RoadMapId: string;
      }>
    >({
      query: ({ projectId, RoadMapId }) => ({
        url: `/${projectId}/roadMap/${RoadMapId}`,
        method: 'get',
      }),
    }),
    CreateProject: builder.mutation<NewProjectAPI, IProject>({
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
    UpdateProject: builder.mutation<NewProjectAPI, Partial<IProject>>({
      query(data) {
        return {
          url: `/${data._id}`,
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
    DeleteProject: builder.mutation<DeletedProjectAPI, Partial<string>>({
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
    GetRoadMaps: builder.query<IRoadMap[], Partial<string | undefined>>({
      query: (id) => ({
        url: `/${id}/roadMap`,
        method: 'GET',
      }),
      providesTags: ['RoadMapsId'],
    }),

    CreateNewRoadMap: builder.mutation({
      query({ projectId, roadMapData }) {
        return {
          url: `/${projectId}/roadMap`,
          method: 'PUT',
          body: roadMapData,
        };
      },
      async onQueryStarted({ projectId }, { dispatch, queryFulfilled }) {
        try {
          const { data: resData } = await queryFulfilled;
          dispatch(
            setAlert({
              alert: resData.message,
              result: resData.result,
            }),
          );

          dispatch(
            ProjectApi.util.updateQueryData(
              'GetProjectId',
              projectId,
              (project: IProject) => {
                project.roadMap.push(resData.roadmap);
                return project;
              },
            ),
          );

          dispatch(
            ProjectApi.util.updateQueryData(
              'GetRoadMaps',
              projectId,
              (data: IRoadMap[]) => [resData.roadmap, ...data],
            ),
          );
        } catch (e: any) {
          setAlert({
            alert: e.error.data.message,
            type: false,
          });
        }
      },
    }),

    EditRoadMap: builder.mutation({
      query({ ProjectID, roadMapData }) {
        return {
          url: `/${ProjectID}/roadMap`,
          method: 'PUT',
          body: roadMapData,
        };
      },

      async onQueryStarted(
        { ProjectID, roadMapData },
        { dispatch, queryFulfilled },
      ) {
        const EditedRoadMap = dispatch(
          ProjectApi.util.updateQueryData(
            'GetRoadMaps',
            ProjectID,
            (data: IRoadMap[]) => {
              const da = data.map((roadMap) => {
                if (roadMap._id === roadMapData._id) {
                  return roadMapData;
                }
                return roadMap;
              });
              return da;
            },
          ),
        );
        try {
          const { data: resData } = await queryFulfilled;
          dispatch(
            setAlert({
              alert: resData.message,
              result: resData.result,
            }),
          );

          dispatch(
            ProjectApi.util.invalidateTags([
              { type: 'projectId', id: ProjectID },
            ]),
          );
        } catch (e: any) {
          EditedRoadMap.undo();
          dispatch(
            setAlert({
              alert: e.error.data.message,
              result: false,
            }),
          );
        }
      },
    }),

    RemoveRoadMap: builder.mutation({
      query({ projectId, RoadMapId }) {
        return {
          url: `/${projectId}/roadMap`,
          method: 'DELETE',
          body: RoadMapId,
        };
      },
      async onQueryStarted(
        { projectId, RoadMapId },
        { dispatch, queryFulfilled },
      ) {
        const deleteResult = dispatch(
          ProjectApi.util.updateQueryData(
            'GetRoadMaps',
            projectId,
            (data: IRoadMap[]) =>
              data.filter((item: any) => item._id !== RoadMapId[0]),
          ),
        );
        try {
          await queryFulfilled;
          dispatch(ProjectApi.util.invalidateTags(['projectId']));
        } catch (error) {
          dispatch(setAlert('Server Error'));
          deleteResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  usePrefetch,
  useGetProjectIdQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useGetRoadMapsQuery,
  useCreateNewRoadMapMutation,
  useRemoveRoadMapMutation,
  useEditRoadMapMutation,
} = ProjectApi;

export default ProjectApi;
