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
  message: string;
  result: boolean;
}

export interface INewPost {
  title: string;
  description: string;
  project: any;
  status: string;
  roadMap: any;
}
export interface IPost extends INewPost {
  _id: string;
  user: string | any;
  date: string;
}

export interface PostState {
  posts: IPost[];
  post: IPost;
  error: null | string;
  alert: null | IAlert;
}

export interface IRoadMap {
  _id: string;
  name: string;
  color?: string;
  progress?: number;
}

export interface IProject {
  _id: string;
  user: string;
  title: string;
  description: string;
  technologies: string[];
  website: string;
  roadMap: IRoadMap[];
  process: number;
  live?: string;
  github?: string;
  date: Date;
}

export interface ProjectState {
  projects: IProject[];
  project: IProject | null;
  error: null | string;
  alert: null | IAlert;
}
