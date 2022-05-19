import { createSlice } from '@reduxjs/toolkit';
import type { IPost } from '../interface';

const PostSlice = createSlice({
  name: 'PostSlice',
  initialState: {
    posts: [],
    post: {},
    error: null,
    alert: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    DeletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post: IPost) => post._id !== action.payload,
      );
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { setError, setPost, setPosts, setAlert, DeletePost } =
  PostSlice.actions;

export default PostSlice.reducer;
