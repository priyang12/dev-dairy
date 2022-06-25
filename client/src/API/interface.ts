import type { AlertState } from '../interface';

export interface NewPostAPI {
  result: boolean;
  message: string;
  post: any;
}

export type UpdatePostAPI = NewPostAPI;

export type DeletedPostAPI = AlertState;
