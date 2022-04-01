import type { User } from 'firebase/auth';

export interface AuthState {
  token: string | null;
  isAuth: boolean;
  user: User | any;
}

export interface AlertState {
  alert: string;
  loading: number;
  result: boolean;
}

export interface Post {
  _id: string;
  title: string;
  text: string;
  user: any;
  likes: any[];
  comments: any[];
  createdAt: string;
}

export interface Comment {
  uid: string;
  text: string;
  user: {
    uid: string;
    name: string;
    photoURL: string;
  };
  createdAt: string;
}

export interface PostState {
  posts: Post[];
  post: Post | null;
  comments: Comment[];
}
