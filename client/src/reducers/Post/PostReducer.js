import {
  ADD_POST,
  ADD_LIKE,
  ADD_UNLIKE,
  ADD_COMMENT,
  POST_ERROR,
  CLEAR_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  SET_LOADING,
} from "../../actions/types";

const init = {
  posts: null,
  error: null,
  loading: true,
  post: null,
};

// eslint-disable-next-line
export default (state = init, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ADD_LIKE:
      return {
        ...state,
        post: { ...state.post, likes: action.payload },
        loading: false,
        error: null,
      };
    case ADD_UNLIKE:
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
    case GET_POSTS:
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };

    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_POST:
      return {
        ...state,
        posts: null,
        error: null,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};
