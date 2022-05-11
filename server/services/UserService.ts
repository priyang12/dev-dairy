import { Service, Inject } from "typedi";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { randomBytes } from "crypto";

import {
  EventDispatcher,
  EventDispatcherInterface,
} from "../decorators/eventDispatcher";

import { Model } from "mongoose";
import { IUser } from "../models/User";
import { Logger } from "winston";

@Service()
export default class UserService {
  constructor(
    @Inject("userModel") private userModel: Model<IUser>,
    @Inject("logger") private logger: Logger
  ) {}

  public async GetUser(user: any): Promise<{ user: any }> {
    //  @TODO Add Emitter here
    return { user };
  }

  public async UpdateUser(
    User: IUser,
    userInputDTO: any
  ): Promise<{ User: any }> {
    if (userInputDTO.name) {
      User.username = userInputDTO.name;
      User.ImageUrl = userInputDTO.ImageUrl;
      if (userInputDTO.password) {
        const salt = randomBytes(32);
        const hashedPassword = await argon2.hash(userInputDTO.password, {
          salt,
        });
        User.password = hashedPassword;
      }

      await User.save();

      return { User };
    }
  }
  public async DeleteUser(UserId: string): Promise<{ message: string }> {
    const User = await this.userModel.findByIdAndDelete(UserId);
    if (!User) {
      throw new Error("User cannot be deleted");
    }

    return { message: "User deleted" };
  }
}
