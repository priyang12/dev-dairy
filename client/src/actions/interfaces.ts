import { UserInfo } from "firebase/auth";

export interface AuthState {
  token: string | null;
  isAuth: boolean;
  user: UserInfo | null;
}

export interface AlertState {
  alert: string | null;
  loading: number;
  result: boolean;
}

export interface Post {
  uid: string;
  title: string;
  text: string;
  user: string;
  likes: [];
  comments: [];
  createdAt: string;
}

export interface PostState {
  posts: Post[];
  post: Post | null;
}
