export interface AuthUserResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    date: string;
  };
  token: string;
}

export interface NewPostAPI {
  result: boolean;
  message: string;
  post: any;
}

export type UpdatePostAPI = NewPostAPI;

export type DeletedPostAPI = {
  result: boolean;
  message: string;
};

export interface NewProjectAPI {
  result: boolean;
  message: string;
  project: any;
}
