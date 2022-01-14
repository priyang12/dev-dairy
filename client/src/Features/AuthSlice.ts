import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState } from "./interfaces";
import AuthReducer from "../reducers/AuthReducer";
import setAuthToken from "../utils/setAuthToken";
import { FirebaseAuth } from "../Firebase";

const InitState: AuthState = {
  token: null,
  isAuth: null,
  user: null,
  error: null,
  loading: false,
};

export const LoginUserAction = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const User = await FirebaseAuth.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      const { user }: any = User;
      const RefreshToken = await user.refreshToken;
      const AccessToken = await user.getIdToken(true);
      localStorage.setItem("RefreshToken", RefreshToken);
      localStorage.setItem("AccessToken", AccessToken);
      setAuthToken(AccessToken);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: InitState,
  reducers: {},
  extraReducers: {
    [LoginUserAction.pending.type]: (state: AuthState) => {
      state.loading = true;
    },
    [LoginUserAction.fulfilled.type]: (state: AuthState, action: any) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    },
    [LoginUserAction.rejected.type]: (state: AuthState, action: any) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default AuthSlice.reducer;

const data = {
  displayName: "priyang",
  email: "gk@gmail.com",
  emailVerified: false,
  isAnonymous: false,
  phoneNumber: null,
  photoURL: null,
  providerData: Array(1),
  providerId: "firebase",
  refreshToken:
    "AFxQ4_pLdv3Wp2VvUFpWM06l0MAOhuTpcgaQNiXAZAos1M5DevGqimzPYgUhQid_N5ZHi6sP6S-2JEtp5CMbCLI7QM9FbCqipYBxPWQbF_krLwHzWxeOlHzn5xvVWEUvZ3Ch4YMWc-Sb5WTgxPmrrrpDb67RjtirWjsNfJ6VbPdHD_CC1SFyDve8VxhiwbKBHBjcsUbqbAuJ",
  tenantId: null,
  uid: "3d5idu5RcuYWKkuuv5jVfrZHx8e2",
};
