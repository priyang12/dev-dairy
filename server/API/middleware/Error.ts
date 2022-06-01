import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Fix err for express-async-errors
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(401);
  return res.json({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production" ? "Server Error 😱" : err.stack,
  });
};