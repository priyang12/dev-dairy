import { NextFunction, Request, Response } from "express";

export default (schema: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.body);
    next();
  };
