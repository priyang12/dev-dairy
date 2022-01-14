import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./Features/AuthSlice";

export default configureStore({
  reducer: {
    Auth: AuthReducer,
  },
});
