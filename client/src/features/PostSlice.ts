import { createSlice } from '@reduxjs/toolkit';

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

export const { setError, setPost, setPosts, setAlert } = PostSlice.actions;

export default PostSlice.reducer;
