import AuthReducer from "./AuthReducer";
// import ProfileReducer from "./ProfileReducer";
import PostReducer from "./PostReducer";
import { combineReducers } from "redux";
import AlertReducer from "./AlertReducer";

const RootReducers = combineReducers({
  Auth: AuthReducer,
  Alert: AlertReducer,
  Post: PostReducer,
});

export default RootReducers;
