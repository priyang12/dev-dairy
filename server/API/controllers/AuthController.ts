import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import AuthService from "../../services/AuthService";
import Container from "typedi";
import UserService from "../../services/UserService";
import NodeCache from "node-cache";

export const UserCache = new NodeCache({ stdTTL: 600 });

// @route   GET api/Users/me
// @desc    Fetch User
// @access  Private
export const GetUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const authServiceInstance = Container.get(UserService);
    const user = await authServiceInstance.GetUser(req.user);
    return res.status(200).json(user);
  }
);

// @router POST api/Users/register
// @desc Register User
// @access public
export const registerUser = asyncHandler(
  async (req, res, next): Promise<any> => {
    const authServiceInstance = Container.get(AuthService);
    const { user, token } = await authServiceInstance.SignUp(req.body);
    return res.status(201).json({ user, token });
  }
);

// @router POST api/users/login
// @desc Login User
// @access Admin
export const loginUser = asyncHandler(async (req, res): Promise<any> => {
  const authServiceInstance = Container.get(AuthService);
  const { user, token } = await authServiceInstance.Login(
    req.body.email,
    req.body.password
  );
  return res.status(200).json({ user, token });
});

// @router PUT api/users/update
// @desc Update User Info
// @access private
export const UpdateUser = asyncHandler(async (req: any, res): Promise<any> => {
  const authServiceInstance = Container.get(UserService);
  const user = await authServiceInstance.UpdateUser(req.user, req.body);
  UserCache.flushAll();
  return res.status(200).json(user);
});

// @router DELETE api/users/delete
// @desc Delete User
// @access private
export const DeleteUser = asyncHandler(
  async (req: any, res: Response): Promise<any> => {
    const authServiceInstance = Container.get(UserService);
    const data = await authServiceInstance.DeleteUser(req.user._id);
    UserCache.flushAll();
    return res.status(200).json(data);
  }
);
