import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../middleware/FindStatusCode";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let code = 500;
  let message = "Internal Server Error";
  if (err instanceof Error) {
    const { statusCode, message: NewErrorMessage } = StatusCode(err);
    code = statusCode;
    message = NewErrorMessage;
  }
  return res.status(code).json({
    message: message,
    stack:
      process.env.NODE_ENV === "production" ? "Server Error 😱" : err.stack,
  });
};
