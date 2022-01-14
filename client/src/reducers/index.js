import AuthReducer from "../Features/AuthSlice";
// import ProfileReducer from "./ProfileReducer";
// import PostReducer from "./PostReducer";
import { combineReducers } from "@reduxjs/toolkit";

const RootReducers = combineReducers({
  Auth: AuthReducer,
});

export default RootReducers;
