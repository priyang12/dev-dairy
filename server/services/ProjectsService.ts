import { Service, Inject } from "typedi";
import { Model } from "mongoose";
import { IProject, IRoadMap } from "../models/Project";
import { Logger } from "winston";
import { IPost } from "../models/Post";

@Service()
export default class UserService {
  constructor(
    @Inject("projectModel") private ProjectModel: Model<IProject>,
    @Inject("postModel") private PostModel: Model<IPost>,
    @Inject("logger") private logger: Logger
  ) {}

  public async GetUserProjects(userId: string): Promise<IProject[]> {
    const Projects = await this.ProjectModel.find({ user: userId }).select(
      "title description process technologies date"
    );
    if (!Projects) {
      this.logger.error("Projects not found");
      throw new Error("No Projects Found in Users");
    }
    this.logger.info("Projects Found");
    return Projects;
  }
  public async GetProject(
    userId: string,
    projectId: string
  ): Promise<IProject> {
    const project = await this.ProjectModel.findOne({
      _id: projectId,
      user: userId,
    }).exec();
    if (!project) {
      this.logger.error("Project not found");
      throw new Error("Project not found");
    }
    this.logger.info("Project found");
    return project;
  }

  public async PostProject(
    userId: string,
    project: IProject
  ): Promise<{ message: string; result: boolean; project: IProject }> {
    const newProject = await this.ProjectModel.create({
      ...project,
      user: userId,
    });
    if (project.roadMap) {
      project.roadMap.forEach(async (roadMap: any) => {
        await this.AddRoadMap(userId, newProject._id, roadMap);
      });
    }
    if (!newProject) {
      this.logger.error("Project not created");
      throw new Error("Project not created");
    }
    this.logger.info("Project created");
    return {
      result: true,
      project: newProject,
      message: `Project ${newProject.title} created`,
    };
  }
  public async UpdateProject(
    userId: string,
    projectId: string,
    project: IProject
  ): Promise<{ message: string; result: boolean }> {
    const updatedProject = await this.ProjectModel.findOneAndUpdate(
      { _id: projectId, user: userId },
      { $set: project },
      { new: true }
    ).exec();
    if (!updatedProject) {
      this.logger.error("Project not updated");
      throw new Error("Project not updated");
    }
    this.logger.info("Project updated");
    return {
      result: true,
      message: `Project ${updatedProject.title} updated`,
    };
  }
  public async AddRoadMap(
    userId: string,
    projectId: string,
    roadmap: IRoadMap | IRoadMap[]
  ) {
    const updatedProject = await this.ProjectModel.findOneAndUpdate(
      { _id: projectId, user: userId },
      { $push: { roadMap: roadmap } },
      { new: true }
    ).exec();

    if (!updatedProject) {
      this.logger.error("Roadmap not added");
      throw new Error("Roadmap not added");
    }
    this.logger.info("Roadmap added");
    const roadMap = updatedProject?.roadMap
      ? updatedProject.roadMap[updatedProject.roadMap.length - 1]
      : null;
    return {
      result: true,
      message: `New RoadMap Added to ${updatedProject.title}`,
      roadmap: roadMap,
    };
  }

  public async DeleteRoadMap(
    userId: string,
    projectId: string,
    roadMap: string | string[]
  ) {
    const updatedProject = await this.ProjectModel.findOneAndUpdate(
      { _id: projectId, user: userId },
      { $pull: { roadMap: { _id: { $in: roadMap } } } },
      { new: true }
    ).exec();

    if (!updatedProject) {
      this.logger.error("Roadmap not deleted");
      throw new Error("Roadmap not deleted");
    }
    this.logger.info("Roadmap deleted");

    return {
      result: true,
      message: `Roadmap from ${updatedProject.title} is deleted`,
    };
  }

  public async DeleteProject(
    userId: string,
    projectId: string
  ): Promise<{ message: string; result: boolean }> {
    //
    const deletedProject = await this.ProjectModel.findOneAndDelete({
      _id: projectId,
      user: userId,
    }).exec();

    const deletedPosts = await this.PostModel.deleteMany({
      project: projectId,
      user: userId,
    }).exec();

    if (!deletedProject || !deletedPosts) {
      this.logger.error("Project not deleted");
      throw new Error("Project not deleted");
    }
    this.logger.info("Project deleted");
    return {
      result: true,
      message: `Project ${deletedProject.title} deleted`,
    };
  }
}
