export interface AuthState {
  authenticated: boolean;
  token: string;
  error: string | null;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  ImageUrl: string;
}

export interface UserState {
  user: IUser;
  error: string;
}

export interface IAlert {
  alert: string;
  result: boolean;
}

export interface IPost {
  user: string | any;
  title: string;
  description: string;
  project: string;
  status: string;
  roadMap: any;
  date: Date;
}

export interface PostState {
  posts: IPost[];
  post: IPost;
  error: null | string;
  alert: null | IAlert;
}
