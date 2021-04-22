import { combineReducers } from "redux";
import AuthReducer from "./auth/AuthReducer";
import ProfileReducer from "./Profile/ProfileReducer";
import PostReducer from "./Post/PostReducer";

export default combineReducers({
  Auth: AuthReducer,
  Profile: ProfileReducer,
  Post: PostReducer,
});
