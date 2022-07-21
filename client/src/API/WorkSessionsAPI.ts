import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type { ISession, IWorkSessions } from '../interface';
import API from '.';

const WorkSessionsApi = createApi({
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
  tagTypes: ['Sessions', 'ProjectSessions'],
  endpoints: (builder) => ({
    GetSessions: builder.query<IWorkSessions[], Partial<void>>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['Sessions'],
    }),

    GetSessionsByProject: builder.query<
      IWorkSessions,
      Partial<string | undefined>
    >({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              {
                type: 'ProjectSessions',
                id: arg,
              },
            ]
          : ['ProjectSessions'],
    }),
    PushSession: builder.mutation<
      Partial<Pick<IWorkSessions, '_id' | 'session'>>,
      Partial<{
        ProjectId: string;
        session: Pick<ISession, 'Time'>;
      }>
    >({
      query: ({ session, ProjectId }) => ({
        url: `/${ProjectId}/push`,
        method: 'PATCH',
        body: session,
      }),
      async onQueryStarted(
        { session, ProjectId },
        { dispatch, queryFulfilled },
      ) {
        try {
          const { data: NewSessions } = await queryFulfilled;
          console.log(NewSessions.session?.length);

          dispatch(
            WorkSessionsApi.util.updateQueryData(
              'GetSessionsByProject',
              ProjectId,
              (sessions: any) => {
                return {
                  ...sessions,
                  session: NewSessions.session,
                };
              },
            ),
          );
        } catch (error: any) {
          WorkSessionsApi.util.invalidateTags([
            {
              type: 'ProjectSessions',
              id: ProjectId,
            },
          ]);
        }
      },
    }),
    PullSessions: builder.mutation<
      Partial<Pick<IWorkSessions, '_id' | 'session'>>,
      Partial<{
        ProjectId: string;
        ArgSessions: any;
      }>
    >({
      query: ({ ProjectId, ArgSessions }) => ({
        url: `/${ProjectId}/pull`,
        method: 'PATCH',
        body: ArgSessions,
      }),
      async onQueryStarted(
        { ProjectId, ArgSessions },
        { dispatch, queryFulfilled },
      ) {
        // Optimistic update
        const OptimisticDelete = dispatch(
          WorkSessionsApi.util.updateQueryData(
            'GetSessionsByProject',
            ProjectId,
            (data) => ({
              ...data,

              session: data.session.filter(
                (session) => !ArgSessions.has(session._id),
              ),
            }),
          ),
        );
        try {
          const { data: resData } = await queryFulfilled;
          // dispatch(
          //   setAlert({
          //     alert: resData.message,
          //     result: resData.result,
          //   }),
          // );
        } catch (error: any) {
          OptimisticDelete.undo();
          // dispatch(setAlert('Server Error'));
        }
      },
    }),
    DeleteAllProjectSessions: builder.mutation<
      Partial<any>,
      Partial<{ projectId: string }>
    >({
      query: ({ projectId }) => ({
        url: `/project/${projectId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'ProjectSessions', id: arg.projectId },
      ],
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

export const {
  useGetSessionsQuery: useGetSessions,
  useGetSessionsByProjectQuery: useGetSessionsByProject,
  useDeleteAllProjectSessionsMutation: useDeleteAllProjectSessions,
  useDeleteAllMutation: useDeleteAll,
  usePushSessionMutation: usePushSession,
  usePullSessionsMutation: usePullSessions,
} = WorkSessionsApi;

export default WorkSessionsApi;
