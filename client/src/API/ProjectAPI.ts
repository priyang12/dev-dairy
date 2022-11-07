import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import API from '.';
import type { IProject, IRoadMap } from '../interface';
import type { RootState } from '../store';
import { CheckError } from '../utils/helpers';
import type { NewProjectAPI } from './interface';

const ProjectApi = createApi({
  reducerPath: 'ProjectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/projects`,
    credentials: 'include',
  }),

  tagTypes: ['projectId', 'RoadMapsId'],

  endpoints: (builder) => ({
    GetProjects: builder.query<IProject[], any>({
      query: (params: any) => ({
        url: '',
        method: 'GET',
        params,
      }),
    }),

    GetProjectId: builder.query<IProject, Partial<string | undefined>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              {
                type: 'projectId',
                id: arg,
              },
            ]
          : ['projectId'],
    }),
    GetProjectRoadMap: builder.query<
      IProject,
      {
        projectId: string;
        RoadMapId: string;
      }
    >({
      query: ({ projectId, RoadMapId }) => ({
        url: `/${projectId}/roadMap/${RoadMapId}`,
        method: 'get',
      }),
    }),
    CreateProject: builder.mutation<
      NewProjectAPI,
      Omit<IProject, 'date' | '_id'>
    >({
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
          toast('Project Created Successfully', {
            type: 'success',
            autoClose: 2000,
          });
          dispatch(
            ProjectApi.util.updateQueryData(
              'GetProjects',
              '',
              (projects: IProject[]) => [NewProject.project, ...projects],
            ),
          );
        } catch (error: any) {
          const errorMessage = CheckError(error);
          toast.error(errorMessage);
        }
      },
    }),
    UpdateProject: builder.mutation<
      {
        result: boolean;
        message: string;
      },
      Partial<IProject>
    >({
      query(data) {
        return {
          url: `/${data._id}`,
          method: 'put',
          body: data,
        };
      },
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            ProjectApi.util.updateQueryData('GetProjects', '', (projects) =>
              projects.map((project) => {
                if (project._id === data._id) {
                  return { ...project, ...data };
                }
                return project;
              }),
            ),
          );
        } catch (error: any) {
          const errorMessage = CheckError(error);
          toast.error(errorMessage);
        }
      },
      invalidatesTags: ['projectId'],
    }),
    DeleteProject: builder.mutation<any, string>({
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
          toast.warn('Project Deleted Successfully', {
            autoClose: 5000,
          });
        } catch (e: any) {
          deleteResult.undo();
          const errorMessage = CheckError(e);
          toast.error(errorMessage);
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

          toast.success('RoadMap created successfully', {
            autoClose: 5000,
          });

          dispatch(
            ProjectApi.util.updateQueryData(
              'GetProjectId',
              projectId,
              (project: IProject) => {
                project.roadMap?.push(resData.roadmap);
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
          const errorMessage = CheckError(e);
          toast.error(errorMessage);
        }
      },
    }),

    EditRoadMap: builder.mutation({
      query({ ProjectID, roadMapData }) {
        return {
          url: `/${ProjectID}/roadMap`,
          method: 'PATCH',
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
          toast.success('RoadMap Edited successfully', {
            autoClose: 5000,
          });

          dispatch(
            ProjectApi.util.invalidateTags([
              { type: 'projectId', id: ProjectID },
            ]),
          );
        } catch (e: any) {
          EditedRoadMap.undo();
          const errorMessage = CheckError(e);
          toast.error(errorMessage);
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
          toast.warn('RoadMap Deleted Successfully', {
            autoClose: 5000,
          });
          dispatch(
            ProjectApi.util.updateQueryData(
              'GetProjectId',
              projectId,
              (project: IProject) => {
                project.roadMap = project.roadMap?.filter(
                  (roadMap) => roadMap._id !== RoadMapId[0],
                );
                return project;
              },
            ),
          );
        } catch (error) {
          deleteResult.undo();
          const errorMessage = CheckError(error);
          toast.error(errorMessage);
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery: useGetProjects,
  usePrefetch,
  useGetProjectIdQuery: useGetProjectId,
  useCreateProjectMutation: useCreateProject,
  useDeleteProjectMutation: useDeleteProject,
  useUpdateProjectMutation: useUpdateProject,
  useGetRoadMapsQuery: useGetRoadMaps,
  useCreateNewRoadMapMutation: useCreateNewRoadMap,
  useRemoveRoadMapMutation: useRemoveRoadMap,
  useEditRoadMapMutation: useEditRoadMap,
} = ProjectApi;

export default ProjectApi;
