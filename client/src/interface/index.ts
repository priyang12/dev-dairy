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

export interface AlertState {
  alert: string;
  result: boolean;
}

export interface IAlert {
  message: string;
  result: boolean;
}

export interface INewPost {
  title: string;
  description: string;
  project: {
    _id: string;
    title: string;
    process: number;
  };
  status: string;
  roadMap: any;
}
export interface IPost extends INewPost {
  _id: string;
  user: string | any;
  date: string;
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
  live?: boolean;
  github?: string;
  date: string;
}

export interface ISession {
  _id: string;
  Time: number;
  createdAt: string;
  updatedAt: string;
}

export interface IWorkSessions {
  _id: string;
  Time: number;
  user: string;
  project: Pick<IProject, '_id' | 'process' | 'title' | 'description'>;
  session: ISession[];
  date: string;
}
