import {
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  CLEAR_POST,
  GET_POSTS,
  GET_POST,
  ADD_LIKE,
  REMOVE_UNLIKE,
} from './types';
import {
  setLoadingAction,
  stopLoadingAction,
  setAlertAction,
} from './AlertAction';

// Still need Review

import axios from 'axios';
import { Dispatch } from 'react';

// Get Posts
export const GetPosts = () => (dispatch: Dispatch<any>) => {
  const data = async () => {
    const res = await axios.get('/api/post');
    return res.data;
  };
  dispatch(callApi(data, GET_POSTS));
};

// Single Post
export const SinglePost = (id: string) => (dispatch: Dispatch<any>) => {
  const data = async () => {
    const res = await axios.get(`/api/post/${id}`);
    return res.data;
  };
  dispatch(callApi(data, GET_POST));
};

const callApi = (AxiosCall: () => any, Type: any) => async (
  dispatch: Dispatch<PostActions>,
) => {
  try {
    dispatch(setLoadingAction(1));
    const data = await AxiosCall();
    dispatch({
      type: Type,
      payload: data,
    });
  } catch (err: any) {
    let errorMessage = 'Server Error';
    if (err?.response) errorMessage = err.response.data.message;
    dispatch(setAlertAction(errorMessage, false));
  } finally {
    dispatch(stopLoadingAction(1));
  }
};
