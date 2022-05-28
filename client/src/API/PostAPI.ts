import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API from '.';
import type { IPost } from '../interface';
import type { RootState } from '../store';

const PostApi = createApi({
  reducerPath: 'PostAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/posts`,
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
      providesTags: ['Posts'],
    }),
    GetPost: builder.query<any, Partial<any>>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'get',
        };
      },
    }),
    GetPostByProject: builder.query<any, Partial<any>>({
      query(id) {
        return {
          url: `/project/${id}`,
          method: 'get',
        };
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
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: NewPost } = await queryFulfilled;
          dispatch(
            PostApi.util.updateQueryData('GetPosts', '', (posts: IPost[]) => [
              NewPost.post,
              ...posts,
            ]),
          );
          // dispatch(setAlert(data));
        } catch (error: any) {
          // const errorMessage = error.error.data.msg || 'server Error';
          // setError(errorMessage);s
          console.log(error);
          dispatch(PostApi.util.invalidateTags(['Posts']));
        }
      },
    }),
    UpdatePost: builder.mutation<any, Partial<any>>({
      query(data) {
        return {
          url: `/${data._id}`,
          method: 'put',
          body: data,
        };
      },
      onQueryStarted(data, { dispatch, queryFulfilled }) {
        const UpdateResult = dispatch(
          PostApi.util.updateQueryData('GetPosts', '', (posts: IPost[]) => {
            const newPost = posts.map((post) =>
              post._id === data._id ? data : post,
            );
            return newPost;
          }),
        );
        queryFulfilled.catch(UpdateResult.undo);
      },
    }),
    DeletePost: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: 'delete',
        };
      },

      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          PostApi.util.updateQueryData('GetPosts', '', (data: any) => {
            const newData = data.filter((item: IPost) => item._id !== id);
            return newData;
          }),
        );
        queryFulfilled.catch(deleteResult.undo);
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
