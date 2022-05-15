import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setPost, setPosts, setError, setAlert } from '../features/PostSlice';
import type { RootState } from '../store';

const PostApi = createApi({
  reducerPath: 'PostAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/posts',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).Auth;
      if (token) {
        headers.set('x-auth-token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Posts'],

  endpoints: (builder) => ({
    GetPosts: builder.query({
      query() {
        return {
          url: '',
          method: 'get',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPosts(data));
        } catch (error: any) {
          const errorMessage = error.error.data.msg || 'server Error';
          console.log(errorMessage);
          //   setError(errorMessage);
        }
      },
    }),
    GetPost: builder.query<any, Partial<any>>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'get',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPost(data));
        } catch (error: any) {
          const errorMessage = error.error.data.msg || 'server Error';
          setError(errorMessage);
        }
      },
    }),
    GetPostByProject: builder.query<any, Partial<any>>({
      query(id) {
        return {
          url: `/project/${id}`,
          method: 'get',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPosts(data));
        } catch (error: any) {
          const errorMessage = error.error.data.msg || 'server Error';
          setError(errorMessage);
        }
      },
    }),
    NewPost: builder.mutation<any, Partial<any>>({
      query(data) {
        return {
          url: '',
          method: 'post',
          body: data,
        };
      },

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAlert(data));
        } catch (error: any) {
          const errorMessage = error.error.data.msg || 'server Error';
          setError(errorMessage);
        }
      },
    }),
    UpdatePost: builder.mutation<any, Partial<any>>({
      query(data) {
        return {
          url: '',
          method: 'put',
          body: data,
        };
      },
    }),
    DeletePost: builder.mutation<any, Partial<any>>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'delete',
        };
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostByProjectQuery,
  useNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = PostApi;

export default PostApi;
