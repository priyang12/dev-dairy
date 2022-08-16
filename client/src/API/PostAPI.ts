import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import API from '.';
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
    GetPosts: builder.query<IPost[], any>({
      query({ page, limit }) {
        return {
          url: '',
          method: 'get',
          params: {
            page,
            limit,
          },
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
            PostApi.util.updateQueryData(
              'GetPosts',
              {
                page: 1,
                limit: 10,
              },
              (posts: IPost[]) => [NewPost.post, ...posts],
            ),
          );
        } catch (error: any) {
          dispatch(PostApi.util.invalidateTags(['Posts']));
        }
      },
    }),
    UpdatePost: builder.mutation<
      UpdatePostAPI,
      {
        UpdatedPost: IPost;
        page: number;
      }
    >({
      query({ UpdatedPost }) {
        return {
          url: `/${UpdatedPost._id}`,
          method: 'put',
          body: UpdatedPost,
        };
      },

      onQueryStarted({ UpdatedPost, page }, { dispatch, queryFulfilled }) {
        const UpdateResult = dispatch(
          PostApi.util.updateQueryData(
            'GetPosts',
            {
              page: page,
              limit: 10,
            },
            (posts) =>
              posts.map((post) => {
                if (post._id === UpdatedPost._id) {
                  UpdatedPost.date = post.date;
                  return UpdatedPost as IPost;
                }
                return post;
              }),
          ),
        );

        queryFulfilled
          .then(({ data: UpdatePost }) => {
            toast.success(`${UpdatePost.message} Updated Successfully`);
          })
          .catch((error: any) => {
            const errorMessage = error.error.data.msg || 'server Error';
            toast.dark(errorMessage);
            UpdateResult.undo();
          });
      },
    }),
    DeletePost: builder.mutation<
      DeletedPostAPI,
      {
        id: string;
        page: number;
      }
    >({
      query({ id }) {
        return {
          url: `/${id}`,
          method: 'delete',
        };
      },

      onQueryStarted({ id, page }, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          PostApi.util.updateQueryData(
            'GetPosts',
            {
              page: page - 1,
              limit: 10,
            },
            (data: IPost[]) => {
              const newData = data.filter((item: IPost) => item._id !== id);
              return newData;
            },
          ),
        );
        queryFulfilled
          .then(({ data: DeleteRes }) => {
            toast.warning(`${DeleteRes.message}`);
          })
          .catch((error: any) => {
            const errorMessage = error.error.data.msg || 'server Error';
            toast.dark(errorMessage);
            deleteResult.undo();
          });
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery: useLazyGetPosts,
  useGetPostQuery,
  useGetPostByProjectQuery,
  useNewPostMutation: useNewPost,
  useUpdatePostMutation,
  useDeletePostMutation: useDeletePost,
} = PostApi;

export default PostApi;
