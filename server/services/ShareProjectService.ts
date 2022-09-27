import { Service, Inject } from "typedi";
import { Model } from "mongoose";
import { IProject } from "../models/Project";
import { ISharedProject } from "../models/ShareProject";
import keys from "../config/keys";
import { Logger } from "winston";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

@Service()
export default class ShareProjectService {
  constructor(
    @Inject("projectModel") private projectModel: Model<IProject>,
    @Inject("sharedProjectModel")
    private sharedProjectModel: Model<ISharedProject>,
    @Inject("logger") private logger: Logger
  ) {}

  public async ShareProject(
    projectId: string,
    userId: string,
    expirationTime: string
  ) {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new Error("CRUD Error: Project is not found");
    }
    const CheckSharedProject = await this.sharedProjectModel.findOne({
      project: projectId,
      user: userId,
    });

    if (CheckSharedProject) {
      throw new Error("CRUD Error: Project is already shared");
    }
    const ExDate = new Date(expirationTime);

    const TokenId = uuidv4();
    const token = jwt.sign({ Id: TokenId }, keys.jwtSecret || "abc123", {
      expiresIn: ExDate.getTime() / 1000,
    });

    const sharedProject = await this.sharedProjectModel.create({
      project: project,
      user: userId,
      JWTToken: TokenId,
      expirationTime: ExDate,
    });

    if (!sharedProject) {
      throw new Error("CRUD Error: Project cannot be shared");
    }
    return { message: "Project shared", token: token };
  }

  public async GetSharedProject(token: string) {
    const ProjectToken = await jwt.verify(token, keys.jwtSecret || "abc123");

    const sharedProject = await this.sharedProjectModel.findOne({
      JWTToken:
        typeof ProjectToken === "string" ? ProjectToken : ProjectToken.Id,
    });

    if (!sharedProject) {
      throw new Error("CRUD Error: Project cannot be shared");
    }
    const Project = await this.projectModel.findById(sharedProject.project);
    return { project: Project };
  }

  public async GetProjectToken(projectId: string, userId: string) {
    const sharedProject = await this.sharedProjectModel.findOne({
      project: projectId,
      user: userId,
    });
    if (!sharedProject) {
      return {
        message: "Project is not shared",
        token: null,
      };
    }
    const ExDate = sharedProject.expirationTime as Date;

    const UUidToken = sharedProject.JWTToken;
    const token = jwt.sign({ Id: UUidToken }, keys.jwtSecret || "abc123", {
      expiresIn: ExDate.getTime() / 1000,
    });
    return {
      token: token,
    };
  }
  public async DeleteSharedProject(userId: string, projectId: string) {
    const sharedProject = await this.sharedProjectModel.deleteOne({
      user: userId,
      project: projectId,
    });
    if (!sharedProject) {
      throw new Error("CRUD Error: Project cannot be shared");
    }
    return sharedProject;
  }
}
