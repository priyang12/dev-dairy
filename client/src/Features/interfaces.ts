export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
  isAuth: boolean | null;
  user: User | null;
  error: string | null;
  loading: boolean;
}
