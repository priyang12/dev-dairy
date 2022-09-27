import {
  PostSchema,
  ProjectSchema,
  RoadMapSchema,
  SessionSchema,
  WorkSessionSchema,
  z,
} from '@dev-dairy/zodvalidation';

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

export type IPost = z.infer<typeof PostSchema> & {
  _id: string;
  project: {
    _id: string;
    title: string;
    process: number;
  };
  date: string;
};

export type IProject = Omit<z.infer<typeof ProjectSchema>, 'date'> & {
  _id: string;
  date: string;
};

export type IRoadMap = z.infer<typeof RoadMapSchema> & {
  _id: string;
};

export type ISession = z.infer<typeof SessionSchema> & {
  _id: string;
};

export type IWorkSessions = Omit<
  z.infer<typeof WorkSessionSchema>,
  'session'
> & {
  _id: string;
  project: Pick<IProject, '_id' | 'process' | 'title' | 'description'>;
  session: ISession[];
  date: string;
};

// export interface IWorkSessions {
//   _id: string;
//   Time: number;
//   user: string;

//   session: ISession[];

// }
