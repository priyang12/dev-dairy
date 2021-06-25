import {
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  ADD_PROFILE,
  LOAD_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  SET_LOADING,
  CLEAR_ERRORS,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from "../actions/types";

const initstate = {
  profile: null,
  profiles: null,
  loading: true,
  error: null,
  isProfile: false,
};

// eslint-disable-next-line
export default (state = initstate, action) => {
  switch (action.type) {
    case ADD_EDUCATION:
    case ADD_EXPERIENCE:
    case ADD_PROFILE:
      return {
        ...state,
        ...action.payload,
        loading: false,
        isProfile: true,
      };
    case LOAD_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: null,
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
