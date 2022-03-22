import { Post, PostState } from "../actions/interfaces";
import {
  ADD_POST,
  ADD_LIKE,
  REMOVE_UNLIKE,
  ADD_COMMENT,
  CLEAR_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
} from "../actions/types";

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
  [ADD_LIKE]: null;
  [REMOVE_UNLIKE]: null;
  [ADD_COMMENT]: null;
  [CLEAR_POST]: null;
  [GET_POSTS]: Post[];
  [GET_POST]: Post;
  [DELETE_POST]: null;
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
        loading: false,
        posts: action.payload,
        error: null,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case ADD_LIKE:
      return {
        ...state,
        post: { ...state.post, likes: action.payload },
      };
    case REMOVE_UNLIKE:
      return {
        ...state,
        post: { ...state.post, unlikes: action.payload },
        loading: false,
        error: null,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
        error: null,
      };

    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
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
