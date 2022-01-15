import { UserInfo } from "firebase/auth";

export interface AuthState {
  token: string | null;
  isAuth: boolean | null;
  user: UserInfo | null;
}

export interface AlertState {
  alert: string | null;
  loading: number;
  result: boolean;
}
