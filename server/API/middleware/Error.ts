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
  let ZodError = {};
  if ("issues" in err) {
    code = 422;
    message = "Invalid Input";
    ZodError = err.flatten();
  }

  if (err instanceof Error && JSON.stringify(ZodError) === "{}") {
    const { statusCode, message: NewErrorMessage } = StatusCode(err);
    code = statusCode;
    message = NewErrorMessage;
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(ZodError);
  }
  return res.status(code).json({
    message: message,
    ZodStack: ZodError,
    stack:
      process.env.NODE_ENV === "production" ? "Server Error 😱" : err.stack,
  });
};
