import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";
import { UserCache } from "../controllers/AuthController";

type token = {
  _id: string;
  name: string;
  exp: number;
};

export default async (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  //check token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }
  try {
    const decoded = (await jwt.verify(token, "abc123")) as token;
    if (!decoded) {
      throw Error("token is not valid ");
    }
    const CacheKey = "User" + decoded._id;
    if (UserCache.has(CacheKey)) {
      req.user = UserCache.get(CacheKey);
    } else {
      const user = await User.findById(decoded._id).select("-password");
      if (!user) {
        return res.status(401).json({ msg: "user not found" });
      }

      UserCache.set(CacheKey, user, 3600 / 2);
      req.user = user;
    }

    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
