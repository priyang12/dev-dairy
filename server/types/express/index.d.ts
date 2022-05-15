import * as express from "express";

declare global {
  declare namespace Express {
    export interface Request {
      user: {
        _id: string;
      };
      orinialUrl: string;
    }
  }
}
