import asyncHandler from "express-async-handler";
import User from "../../models/User";

import { validationResult } from "express-validator";

import type { Request, Response } from "express";

// @route   GET api/Users/me
// @desc    Fetch User
// @access  Private
export const GetUser = asyncHandler(async (req: Request, res: Response) => {});

// @router POST api/Users/register
// @desc Register User
// @access public
export const registerUser = asyncHandler(
  async (req, res): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    const { username, email, uid, ImageUrl } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");
    const user = new User({
      uid,
      username,
      email,
      ImageUrl,
    });
    user.save();
    return res.status(201).json({ msg: "User created" });
  }
);

// @router POST api/users/login
// @desc Login User
// @access Admin
export const loginUser = asyncHandler(
  async (req, res): Promise<any> => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error("User does not exist");

    if (!user) throw new Error("User not found");
    return res.json(user);
  }
);

// @router PUT api/users/update
// @desc Update User Info
// @access private
export const UpdateUser = asyncHandler(
  async (req, res): Promise<any> => {
    const { email, ImageUrl } = req.body;

    //Check if user exists
    let user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    // Update user
    user.email = email;
    user.ImageUrl = ImageUrl;
    await user.save();
  }
);
