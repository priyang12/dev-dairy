import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API from '.';
import { setAlert } from '../features/AlertSlice';
import type { IPost } from '../interface';
import type { RootState } from '../store';
import type { DeletedPostAPI, NewPostAPI, UpdatePostAPI } from './interface';

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
    GetPosts: builder.query<IPost[], null>({
      query() {
        return {
          url: '',
          method: 'get',
        };
      },
      providesTags: ['Posts'],
    }),
    GetPost: builder.query<IPost, Partial<string>>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'get',
        };
      },
    }),
    GetPostByProject: builder.query<IPost[], Partial<string>>({
      query(id) {
        return {
          url: `/project/${id}`,
          method: 'get',
        };
      },
    }),
    NewPost: builder.mutation<NewPostAPI, Partial<IPost>>({
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
            PostApi.util.updateQueryData('GetPosts', null, (posts: IPost[]) => [
              NewPost.post,
              ...posts,
            ]),
          );
          dispatch(
            setAlert({
              alert: `${NewPost.post.title} Created Successfully`,
              result: true,
            }),
          );
        } catch (error: any) {
          dispatch(
            setAlert({
              alert: error.error.data.msg || 'server Error',
              result: false,
            }),
          );
          dispatch(PostApi.util.invalidateTags(['Posts']));
        }
      },
    }),
    UpdatePost: builder.mutation<UpdatePostAPI, Partial<IPost>>({
      query(data) {
        return {
          url: `/${data._id}`,
          method: 'put',
          body: data,
        };
      },
      onQueryStarted(data, { dispatch, queryFulfilled }) {
        const UpdateResult = dispatch(
          PostApi.util.updateQueryData('GetPosts', null, (posts) => posts.map((post) => {
            if (post._id === data._id) {
              data.date = post.date;
              return data as IPost;
            }
            return post;
          })),
        );

        queryFulfilled.catch(UpdateResult.undo);
      },
    }),
    DeletePost: builder.mutation<DeletedPostAPI, Partial<string>>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'delete',
        };
      },

      onQueryStarted(id, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          PostApi.util.updateQueryData('GetPosts', null, (data: IPost[]) => {
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
