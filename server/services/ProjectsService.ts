import { Service, Inject } from "typedi";
import { Model } from "mongoose";
import { IProject, IRoadMap } from "../models/Project";
import { Logger } from "winston";
import { IPost } from "../models/Post";
import { IWorkSessions } from "../models/WorkSessions";

@Service()
export default class UserService {
  constructor(
    @Inject("projectModel") private ProjectModel: Model<IProject>,
    @Inject("postModel") private PostModel: Model<IPost>,
    @Inject("workSessionsModel") private WorkSessionModel: Model<IWorkSessions>,
    @Inject("logger") private logger: Logger
  ) {}

  public async GetUserProjects(
    userId: string,
    Select: string
  ): Promise<IProject[]> {
    console.log(Select);

    const Projects = await this.ProjectModel.find({ user: userId }).select(
      Select?.concat(" -__v") || "-__v"
    );

    if (!Projects) {
      this.logger.error("Projects Not Found");
      throw new Error("User's Projects Not Found");
    }
    this.logger.info("Projects Found");
    return Projects;
  }

  public async GetProject(
    userId: string,
    projectId: string,
    Select: string
  ): Promise<IProject> {
    const project = await this.ProjectModel.findOne({
      _id: projectId,
      user: userId,
    })
      .select(Select?.concat(" -__v") || "-__v")
      .exec();
    if (!project) {
      this.logger.error("Project Not Found");
      throw new Error("Project Not Found");
    }
    this.logger.info("Project found");
    return project;
  }

  public async GetRoadMaps(userId: string, projectId: string): Promise<any> {
    const roadMaps = await this.ProjectModel.findOne({
      _id: projectId,
      user: userId,
    }).select("roadMap");

    if (!roadMaps) {
      this.logger.error("RoadMaps Not Found");
      throw new Error("RoadMaps Not Found");
    }

    this.logger.info("RoadMaps Found");

    return roadMaps;
  }

  public async PostProject(
    userId: string,
    project: IProject
  ): Promise<{ message: string; result: boolean; project: IProject }> {
    const newProject = await this.ProjectModel.create({
      ...project,
      user: userId,
    });
    const WorkSession = await this.WorkSessionModel.create({
      project: newProject._id,
      user: userId,
      session: [],
      date: new Date(),
    });

    if (!newProject || !WorkSession) {
      this.logger.error("Project Not Created");
      throw new Error("CRUD Error: Project Not Created");
    }

    this.logger.info("Project created with RoadMaps");
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
      this.logger.error("CRUD Error: Project not Updated");
      throw new Error("CRUD Error: Project not Updated");
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
      this.logger.error("CRUD Error: RoadMap not added");
      throw new Error("CRUD Error: RoadMap not added");
    }
    this.logger.info("RoadMap added");
    const roadMap = updatedProject?.roadMap
      ? updatedProject.roadMap[updatedProject.roadMap.length - 1]
      : null;
    return {
      result: true,
      message: `New RoadMap Added to ${updatedProject.title}`,
      roadmap: roadMap,
    };
  }

  public async EditRoadMap(
    userId: string,
    projectId: string,
    roadMap: IRoadMap
  ) {
    console.log(roadMap._id);

    const updatedRoadMap = await this.ProjectModel.findOneAndUpdate(
      { _id: projectId, user: userId, "roadMap._id": roadMap._id },
      {
        $set: {
          "roadMap.$": roadMap,
        },
      },
      { new: true }
    ).exec();

    if (!updatedRoadMap) {
      this.logger.error("CRUD Error: RoadMap not Updated");
      throw new Error("CRUD Error: RoadMap not Updated");
    }
    this.logger.info("Roadmap Updated");
    return {
      result: true,
      message: `RoadMap Updated`,
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
      this.logger.error("CRUD Error: RoadMap not deleted");
      throw new Error("CRUD Error: RoadMap not deleted");
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
    const deletedProject = await this.ProjectModel.findOneAndDelete({
      _id: projectId,
      user: userId,
    }).exec();

    const deletedPosts = await this.PostModel.deleteMany({
      project: projectId,
      user: userId,
    }).exec();

    if (!deletedProject || !deletedPosts) {
      this.logger.error("CRUD Error: Project Not Deleted");
      throw new Error("CRUD Error: Project Not Deleted");
    }
    this.logger.info("Project deleted");
    return {
      result: true,
      message: `Project ${deletedProject.title} deleted`,
    };
  }
}
