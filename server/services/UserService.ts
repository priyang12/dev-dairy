import { Service, Inject } from "typedi";
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
    userId: string,
    userInputDTO: any
  ): Promise<{ user: IUser; message: string }> {
    const User = await this.userModel.findByIdAndUpdate(userId, userInputDTO, {
      new: true,
    });
    if (!User) {
      throw new Error("CRUD Error: User cannot be updated");
    }
    return { user: User, message: "User updated" };
  }
  public async DeleteUser(UserId: string): Promise<{ message: string }> {
    const User = await this.userModel.findByIdAndDelete(UserId);
    if (!User) {
      throw new Error("User cannot be deleted");
    }
    return { message: "User deleted" };
  }
}
