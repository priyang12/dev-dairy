import {
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  POST_ERROR,
  CLEAR_POST,
  GET_POSTS,
  GET_POST,
  SET_LOADING,
  ADD_LIKE,
  ADD_UNLIKE,
} from "../actions/types";
import axios from "axios";

//Add Post
export const AddPost = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/posts", data);
    console.log(res.data);
    dispatch({
      type: ADD_POST,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
//Add like
export const AddLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: ADD_LIKE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
//remove like
export const RemoveLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: ADD_UNLIKE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

//post commnet
export const PostComment = (comment, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/posts/comment/${id}`, comment, config);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
//Get Posts
export const GetPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
//Get Post
export const GetPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

//Delete Post
export const DeletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

//Delete comment
export const DeleteComment = (postId, comment_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/posts/comment/${postId}/${comment_id}`
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};

//clear posts
export const clearPosts = () => async (dispatch) =>
  dispatch({ type: CLEAR_POST });

//loading

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
