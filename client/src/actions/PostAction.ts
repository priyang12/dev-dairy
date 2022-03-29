import type { Dispatch } from 'react';
import axios from 'axios';
import {
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  GET_POSTS,
  GET_POST,
} from './types';
import {
  setLoadingAction,
  stopLoadingAction,
  setAlertAction,
} from './AlertAction';
import type { PostActions } from '../reducers/PostReducer';
import type { AlertActions } from '../reducers/AlertReducer';
import type { Post } from './interfaces';

// Get Posts
export const getPostsAction = () => async (dispatch: Dispatch<PostActions>) => {
  try {
    dispatch(setLoadingAction(1));
    const res: any = await axios.get('/api/post');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error: any) {
    let errorMessage = 'Server Error';
    if (error?.response) errorMessage = error.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  } finally {
    dispatch(stopLoadingAction(1));
  }
};

// Delete Post
export const deletePostAction = (id: string) => async (
  dispatch: Dispatch<PostActions>,
) => {
  try {
    const res = await axios.delete(`/api/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlertAction(res.data.message, false));
  } catch (error: any) {
    let errorMessage = 'Server Error';
    if (error?.response) errorMessage = error.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  } finally {
    dispatch(stopLoadingAction(1));
  }
};

// Get Post
export const GetPost = (id: string) => async (
  dispatch: Dispatch<PostActions | AlertActions>,
) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err: any) {
    let errorMessage = 'Server Error';
    if (err?.response) errorMessage = err.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  }
};

// //Add Post
export const AddPost = (data: Post) => async (
  dispatch: Dispatch<PostActions>,
) => {
  try {
    const res = await axios.post('/api/posts', data);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err: any) {
    let errorMessage = 'Server Error';
    if (err?.response) errorMessage = err.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  }
};

// //Add like
export const AddLike = (id: string) => async (
  dispatch: Dispatch<PostActions>,
) => {
  try {
    await axios.put(`/api/post/like/${id}`);
  } catch (err: any) {
    let errorMessage = 'Server Error';
    console.log(err);
    if (err?.response) errorMessage = err.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  }
};
// //remove like
export const RemoveLike = (id: string) => async (
  dispatch: Dispatch<PostActions | AlertActions>,
) => {
  try {
    await axios.put(`/api/post/unlike/${id}`);
  } catch (err: any) {
    let errorMessage = 'Server Error';
    if (err?.response) errorMessage = err.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  }
};

// //post comment
export const PostComment = (comment: any, id: string) => async (
  dispatch: Dispatch<PostActions | AlertActions>,
) => {
  try {
    const res = await axios.post(`/api/posts/comment/${id}`, comment);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err: any) {
    let errorMessage = 'Server Error';
    if (err?.response) errorMessage = err.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  }
};

// //Delete comment
export const DeleteComment = (postId: string, comment_id: string) => async (
  dispatch: Dispatch<PostActions | AlertActions>,
) => {
  try {
    const res = await axios.delete(
      `/api/posts/comment/${postId}/${comment_id}`,
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (err: any) {
    let errorMessage = 'Server Error';
    if (err?.response) errorMessage = err.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  }
};
