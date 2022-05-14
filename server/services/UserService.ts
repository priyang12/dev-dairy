import { Service, Inject } from "typedi";

import argon2 from "argon2";
import { randomBytes } from "crypto";

import { Model } from "mongoose";
import { IUser } from "../models/User";
import { Logger } from "winston";

@Service()
export default class UserService {
  constructor(
    @Inject("userModel") private userModel: Model<IUser>,
    @Inject("logger") private logger: Logger
  ) {}

  public async GetUser(user: any): Promise<{ user: IUser }> {
    //  @TODO Add Emitter here
    return user;
  }

  public async UpdateUser(
    User: IUser,
    userInputDTO: any
  ): Promise<{ user: IUser; message: string }> {
    if (userInputDTO) {
      User.username = userInputDTO.username;
      User.ImageUrl = userInputDTO.ImageUrl;
      if (userInputDTO.password) {
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash(userInputDTO.password, {
          salt,
        });
        User.password = hashedPassword;
      }

      await User.save();

      return {
        user: User,
        message: "User updated",
      };
    }
    throw new Error("User cannot be updated");
  }
  public async DeleteUser(UserId: string): Promise<{ message: string }> {
    const User = await this.userModel.findByIdAndDelete(UserId);
    if (!User) {
      throw new Error("User cannot be deleted");
    }
    return { message: "User deleted" };
  }
}
