import type { NextFunction, Request, Response } from 'express';
import { auth as getAuth } from 'firebase-admin';

export default async (req: any, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  //check token
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }
  try {
    const decoded = await getAuth().verifyIdToken(token);

    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ msg: 'token has expired' });
    }
    req.user._id = decoded.uid;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
