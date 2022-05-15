import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async (req: any, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  //check token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }
  try {
    const decoded: any = await jwt.verify(token, "abc123");
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ msg: "user not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
