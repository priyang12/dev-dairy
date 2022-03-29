import asyncHandler from 'express-async-handler';
import User from '../models/User';
import admin from 'firebase-admin';
import { validationResult } from 'express-validator';

import type { Request, Response } from 'express';

// @route   GET api/Users/me
// @desc    Fetch User
// @access  Private
export const GetUser = asyncHandler(async (req: any, res: Response) => {
  try {
    const users = await admin.auth().getUser(req.user._id);
    if (!users) throw new Error('No users were found');
    res.json(users);
  } catch (error) {
    res.status(500).send('server Error');
  }
});

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
    const { username, email, _id } = req.body;

    //create user
    const user = new User({
      _id,
      username,
      email,
    });
    if (!user) throw new Error('User not found');
    return res.json({ message: 'User Created' });
  },
);

// @router POST api/users/login
// @desc Login User
// @access Admin
export const loginUser = asyncHandler(
  async (req, res): Promise<any> => {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) throw new Error('User not found');
    return res.json(user);
  },
);

// @router PUT api/users/update
// @desc Update User Info
// @access private
export const UpdateUser = asyncHandler(
  async (req, res): Promise<any> => {
    const { email, ImageUrl } = req.body;

    //Check if user exists
    let user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    // Update user
    user.email = email;
    user.ImageUrl = ImageUrl;
    await user.save();
  },
);
