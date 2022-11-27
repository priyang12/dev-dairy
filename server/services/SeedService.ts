import { Service, Inject } from "typedi";
import { Model } from "mongoose";
import { Logger } from "winston";
import { IPost } from "../models/Post";
import { TestUser as MockedUser } from "../SeedData/UserData";
import { runInTransaction } from "../utils/Transactions";
import { CreateProjects } from "../SeedData/ProjectData";
import { IProject } from "../models/Project";
import { IUser } from "../models/User";
import { IWorkSessions } from "../models/WorkSessions";
import { ITestUser } from "../models/TestUsers";
import { PostFn } from "../SeedData/PostData";
import { WorkSessionFn } from "../SeedData/WorkSessionData";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { randomBytes } from "crypto";
@Service()
export default class SeedService {
  constructor(
    @Inject("userModel") private UserModel: Model<IUser>,
    @Inject("projectModel") private ProjectModel: Model<IProject>,
    @Inject("postModel") private PostModel: Model<IPost>,
    @Inject("testUserModel") private testUserModel: Model<ITestUser>,
    @Inject("workSessionsModel")
    private WorkSessionsModel: Model<IWorkSessions>,
    @Inject("logger") private logger: Logger
  ) {}

  public async GetUserToken(userId: string) {
    const TestUsers = await this.testUserModel
      .find({
        id: userId,
      })
      .select("user")
      .populate("user", ["username", "email", "password"]);

    const Token = this.generateToken(TestUsers[0].user);

    return {
      token: Token,
    };
  }

  public async SeedDataBase(userId: string) {
    return await runInTransaction(async (session) => {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(MockedUser.password, {
        salt,
      });
      const user = await this.UserModel.create(
        [
          {
            ...MockedUser,
            password: hashedPassword,
          },
        ],
        {
          session: session,
        }
      );

      const TestUser = await this.testUserModel.create(
        [
          {
            id: userId,
            user: user[0]._id,
          },
        ],
        {
          session: session,
        }
      );
      this.logger.info("Test User Created");

      const Projects = await this.ProjectModel.insertMany(
        CreateProjects(user[0]._id as unknown as string),
        {
          session: session,
        }
      );

      this.logger.info("Projects Seeded");
      const MockPosts = [];
      for (let index = 0; index < 20; index++) {
        const RandomProject =
          Projects[Math.floor(Math.random() * Projects.length)];
        if (RandomProject.roadMap) {
          const Post = PostFn(
            user[0]._id as unknown as string,
            RandomProject._id,
            RandomProject.roadMap[0]._id as string
          );
          MockPosts.push(Post);
        } else {
          throw Error("Server Error");
        }
      }
      const Posts = await this.PostModel.insertMany(MockPosts, {
        session: session,
      });
      this.logger.info("Posts Seeded");
      const MockWorkSessions = Projects.map((item) => {
        return {
          project: item._id,
          user: user[0]._id,
          session: WorkSessionFn(),
          Time: 5000,
          date: new Date(),
        };
      });
      const WorkSession = await this.WorkSessionsModel.insertMany(
        MockWorkSessions,
        {
          session: session,
        }
      );
      this.logger.info("Seed Completed");
      if (!user || !Posts || !TestUser || !WorkSession || !Projects) {
        this.logger.error("Seed Failed");
        throw new Error("Server Error");
      } else {
        Reflect.deleteProperty(user, "password");
        const token = this.generateToken(user);
        return {
          token: token,
        };
      }
    });
  }
  public async DeleteManyTestUsers(userIds: string[]) {
    return await runInTransaction(async (session) => {
      const TestUsers = await this.testUserModel
        .find({
          id: userIds,
        })
        .select("user");

      const UsersIds = await this.UserModel.find({
        _id: TestUsers.map((item) => item.user),
      }).select("_id");

      await this.ProjectModel.deleteMany(
        {
          user: { $in: UsersIds },
        },
        { session }
      );

      this.logger.warn("Projects Deleted");

      await this.PostModel.deleteMany(
        {
          user: { $in: UsersIds },
        },
        { session }
      );

      this.logger.warn("Posts Deleted");

      await this.WorkSessionsModel.deleteMany(
        {
          user: {
            $in: UsersIds,
          },
        },
        { session }
      );

      this.logger.warn("WorkSession Deleted");

      await this.UserModel.deleteMany(
        {
          user: {
            $in: UsersIds,
          },
        },
        { session }
      );

      this.logger.warn("Users Deleted");

      const DeleteTestUsers = await this.testUserModel.deleteMany(
        {
          id: { $in: userIds },
        },
        {
          session: session,
        }
      );

      this.logger.warn("Test User Deleted");

      if (!DeleteTestUsers.deletedCount) {
        throw Error("Server Error");
      } else {
        return DeleteTestUsers;
      }
    });
  }
  private generateToken(user: any): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      "abc123"
    );
  }
}
