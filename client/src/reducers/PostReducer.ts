import type { Comment, Post, PostState } from '../actions/interfaces';
import {
  ADD_POST,
  ADD_COMMENT,
  CLEAR_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
} from '../actions/types';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
type PostPayload = {
  [ADD_POST]: Post;
  [ADD_COMMENT]: Comment;
  [CLEAR_POST]: null;
  [GET_POSTS]: Post[];
  [GET_POST]: Post;
  [DELETE_POST]: string;
};

export type PostActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>];

const init: PostState = {
  posts: [],
  post: null,
  comments: [],
};

// eslint-disable-next-line
export default (state = init, action: PostActions) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case ADD_COMMENT:
      if (state.post) {
        return {
          ...state,
          post: {
            ...state.post,
            comments: [action.payload, ...state.post.comments],
          },
        };
      }
      return {
        ...state,
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CLEAR_POST:
      return {
        ...state,
        posts: null,
        error: null,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
