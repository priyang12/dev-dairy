import { Service, Inject } from "typedi";
import { randomBytes } from "crypto";
import { Model } from "mongoose";
import { IUser } from "../models/User";
import { Logger } from "winston";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
@Service()
export default class AuthService {
  constructor(
    @Inject("userModel") private userModel: Model<IUser>,
    @Inject("logger") private logger: Logger
  ) {}

  public async SignUp(
    userInputDTO: any
  ): Promise<{ user: any; token: string }> {
    // Check if user exists
    const emailExists = await this.userModel.findOne({
      email: userInputDTO.email,
    });
    if (emailExists) {
      throw new Error("User already exists");
    }
    const salt = randomBytes(32);
    const hashedPassword = await argon2.hash(userInputDTO.password, { salt });

    const userRecord = await this.userModel.create({
      ...userInputDTO,
      password: hashedPassword,
    });
    this.logger.silly(`User created: ${userRecord}`);
    if (!userRecord) {
      throw new Error("User cannot be created");
    }
    const token = this.generateToken(userRecord);

    /**
     * @TODO This is not the best way to deal with this
     * There should exist a 'Mapper' layer
     * that transforms data from layer to layer
     * but that's too over-engineering for now
     */
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");

    return { user, token };
  }

  public async Login(
    email: string,
    password: string
  ): Promise<{ user: any; token: string }> {
    const userRecord = await this.userModel.findOne({ email });
    if (!userRecord) {
      throw Error("User not registered");
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly("Checking password");
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");

      return { user, token };
    } else {
      throw new Error("Invalid Password");
    }
  }

  private generateToken(user: any): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      "abc123"
    );
  }
}
