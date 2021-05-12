import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ProfileReducer from "./ProfileReducer";
import PostReducer from "./PostReducer";

export default combineReducers({
  Auth: AuthReducer,
  Profile: ProfileReducer,
  Post: PostReducer,
});
