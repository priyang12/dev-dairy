import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { CheckError } from '../utils/helpers';
import API from '.';
import type { IPost, IProject } from '../interface';
import type { DeletedPostAPI, NewPostAPI, UpdatePostAPI } from './interface';

const PostApi = createApi({
  reducerPath: 'PostAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API}/posts`,
    credentials: 'include',
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    GetPosts: builder.query<IPost[], any>({
      query(params) {
        return {
          url: '',
          method: 'get',
          params,
        };
      },
      providesTags: ['Posts'],
    }),
    NewPost: builder.mutation<
      NewPostAPI,
      {
        CreatePost: IPost;
        ProjectData: Pick<IProject, '_id' | 'title' | 'process'>;
      }
    >({
      query({ CreatePost }) {
        return {
          url: '',
          method: 'post',
          body: CreatePost,
        };
      },
      async onQueryStarted({ ProjectData }, { dispatch, queryFulfilled }) {
        try {
          const { data: NewPost } = await queryFulfilled;

          dispatch(
            PostApi.util.updateQueryData(
              'GetPosts',
              {
                page: 1,
                limit: 10,
              },
              (posts) => [
                {
                  ...NewPost.post,
                  project: ProjectData,
                },
                ...posts,
              ],
            ),
          );
        } catch (error: any) {
          const errorMessage = CheckError(error);
          toast.error(errorMessage);
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
      query({ UpdatedPost, page }) {
        return {
          url: `/${UpdatedPost._id}`,
          method: 'put',
          body: UpdatedPost,
        };
      },
      onQueryStarted({ UpdatedPost, page }, { dispatch, queryFulfilled }) {
        // need to look at
        // it is causing api call to send wrong data
        // const UpdateResult = dispatch(
        //   PostApi.util.updateQueryData(
        //     'GetPosts',
        //     {
        //       page,
        //       limit: 10,
        //     },
        //     (posts) =>
        //       posts.map((post) => {
        //         if (post._id === UpdatedPost._id) {
        //           UpdatedPost.project = post.project;
        //           UpdatedPost.date = post.date;
        //           return UpdatedPost as IPost;
        //         }
        //         return post;
        //       }),
        //   ),
        // );

        queryFulfilled
          .then(({ data: UpdatePost }) => {
            toast.success(`${UpdatePost.message} Updated Successfully`);
            dispatch(
              PostApi.util.updateQueryData(
                'GetPosts',
                {
                  page,
                  limit: 10,
                },
                (posts) =>
                  posts.map((post) => {
                    if (post._id === UpdatedPost._id) {
                      UpdatedPost.project = post.project;
                      UpdatedPost.date = post.date;
                      return UpdatedPost as IPost;
                    }
                    return post;
                  }),
              ),
            );
          })
          .catch((error: any) => {
            const errorMessage = CheckError(error);
            toast.warning(errorMessage);
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
              page,
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
            const errorMessage = CheckError(error);
            toast.dark(errorMessage);
            deleteResult.undo();
          });
      },
    }),
    UpdateFilterPost: builder.mutation<
      UpdatePostAPI,
      {
        UpdatedPost: IPost;
        filter: string;
      }
    >({
      query({ UpdatedPost }) {
        return {
          url: `/${UpdatedPost._id}`,
          method: 'PUT',
          body: UpdatedPost,
        };
      },
      onQueryStarted({ UpdatedPost, filter }, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: UpdatePost }) => {
            dispatch(PostApi.util.invalidateTags(['Posts']));
            toast.success(`${UpdatePost.message} Updated Successfully`);
            dispatch(
              PostApi.util.updateQueryData('GetPosts', filter, (posts) =>
                posts.map((post) => {
                  if (post._id === UpdatedPost._id) {
                    UpdatedPost.project = post.project;
                    UpdatedPost.date = post.date;
                    return UpdatedPost as IPost;
                  }
                  return post;
                }),
              ),
            );
          })
          .catch((error: any) => {
            const errorMessage = CheckError(error);
            toast.dark(errorMessage);
          });
      },
    }),
    DeleteFilterPost: builder.mutation<
      DeletedPostAPI,
      {
        id: string;
        filter: string;
      }
    >({
      query({ id }) {
        return {
          url: `/${id}`,
          method: 'delete',
        };
      },

      onQueryStarted({ id, filter }, { dispatch, queryFulfilled }) {
        const deleteResult = dispatch(
          PostApi.util.updateQueryData('GetPosts', filter, (data: IPost[]) => {
            const newData = data.filter((item: IPost) => item._id !== id);
            return newData;
          }),
        );
        queryFulfilled
          .then(({ data: DeleteRes }) => {
            dispatch(PostApi.util.invalidateTags(['Posts']));
            toast.warning(`${DeleteRes.message}`);
          })
          .catch((error: any) => {
            const errorMessage = CheckError(error);
            toast.error(errorMessage);
            deleteResult.undo();
          });
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery: useLazyGetPosts,
  useNewPostMutation: useNewPost,
  useUpdatePostMutation,
  useUpdateFilterPostMutation: useUpdateFilterPost,
  useDeletePostMutation: useDeletePost,
  useDeleteFilterPostMutation: useDeleteFilterPost,
} = PostApi;

export default PostApi;
