import { Service, Inject } from "typedi";
import { LeanDocument, Model } from "mongoose";
import { Logger } from "winston";
import { ISession, IWorkSessions } from "../models/WorkSessions";
import type { DeleteWriteOpResultObject } from "mongodb";

@Service()
export default class WorkSessionService {
  constructor(
    @Inject("workSessionsModel") private WorkSessions: Model<IWorkSessions>,
    @Inject("logger") private logger: Logger
  ) {}

  public async GetWorkSessions(
    userId: string
  ): Promise<LeanDocument<IWorkSessions[]>> {
    const WorkSessions = await this.WorkSessions.find({ user: userId })
      .populate({
        path: "project",
        select: "title process description",
      })
      .lean()
      .exec();
    if (!WorkSessions) {
      this.logger.error("WorkSessions Not Found");
      throw new Error("No WorkSessions Found in Users");
    }
    this.logger.info("WorkSessions Found");
    return WorkSessions;
  }

  public async GetWorkSession(
    userId: string,
    WorkSessionId: string
  ): Promise<LeanDocument<IWorkSessions>> {
    const WorkSessions = await this.WorkSessions.findOne({
      _id: WorkSessionId,
      user: userId,
    })
      .lean()
      .exec();
    if (!WorkSessions) {
      this.logger.error("WorkSessions Not Found");
      throw new Error("WorkSessions Not Found");
    }
    this.logger.info("WorkSessions found");
    return WorkSessions;
  }

  public async GetProjectWorkSessions(
    userId: string,
    ProjectId: string
  ): Promise<LeanDocument<IWorkSessions>> {
    const WorkSessions = await this.WorkSessions.findOne({
      project: ProjectId,
      user: userId,
    })
      .lean()
      .exec();
    if (!WorkSessions) {
      this.logger.error("WorkSessions Not Found");
      throw new Error("WorkSessions Not Found");
    }
    this.logger.info("WorkSessions found");
    return WorkSessions;
  }
  public async CreateWorkSession(
    userId: string,
    ProjectId: string
  ): Promise<LeanDocument<IWorkSessions>> {
    const CheckWorkSessions = await this.WorkSessions.findOne({
      user: userId,
      project: ProjectId,
    })
      .lean()
      .exec();
    if (CheckWorkSessions) {
      this.logger.error("CRUD Error: WorkSessions already exists");
      throw new Error("CRUD Error: WorkSessions already exists");
    }
    const newWorkSessions = this.WorkSessions.create({
      user: userId,
      project: ProjectId,
      session: [],
      date: Date.now(),
    });

    if (!newWorkSessions) {
      this.logger.error("CRUD Error: WorkSessions Not Found");
      throw new Error("CRUD Error: WorkSessions Not Found");
    }
    this.logger.info("WorkSessions found");
    return newWorkSessions;
  }

  public async PushWorkSession(
    userId: string,
    ProjectId: string,
    NewWorkSession: ISession
  ) {
    const newWorkSessions = this.WorkSessions.findOneAndUpdate(
      { project: ProjectId, user: userId },
      { $push: { session: NewWorkSession } },
      { new: true }
    ).select("session");
    if (!newWorkSessions) {
      this.logger.error("WorkSessions Not Found");
      throw new Error("WorkSessions Not Found");
    }
    this.logger.info("WorkSessions found");
    return newWorkSessions;
  }

  public async PullWorkSession(
    userId: string,
    ProjectId: string,
    WorkSession: ISession
  ) {
    const newWorkSessions = this.WorkSessions.findOneAndUpdate(
      { project: ProjectId, user: userId },
      { $pull: { session: WorkSession } },
      { new: true }
    ).select("session");
    if (!newWorkSessions) {
      this.logger.error("WorkSessions Not Found");
      throw new Error("WorkSessions Not Found");
    }
    this.logger.info("WorkSessions found");
    return newWorkSessions;
  }

  public async UpdateWorkSession(
    userId: string,
    ProjectId: string,
    NewWorkSession: IWorkSessions
  ): Promise<LeanDocument<IWorkSessions>> {
    const updatedWorkSessions = await this.WorkSessions.findOneAndUpdate(
      { _id: ProjectId, user: userId },
      { $set: NewWorkSession },
      { new: true }
    )
      .lean()
      .exec();
    if (!updatedWorkSessions) {
      this.logger.error("CRUD Error: WorkSessions Not Updated");
      throw new Error("CRUD Error: WorkSessions Not Updated");
    }
    this.logger.info("WorkSessions found");
    return updatedWorkSessions;
  }

  public async DeleteWorkSession(
    userId: string,
    WordSessionId: string
  ): Promise<DeleteWriteOpResultObject> {
    const deletedWorkSessions = await this.WorkSessions.deleteOne({
      _id: WordSessionId,
      user: userId,
    })
      .lean()
      .exec();
    console.log(deletedWorkSessions.deletedCount);

    if (!deletedWorkSessions.deletedCount) {
      this.logger.error("CRUD Error: WorkSessions Not Deleted");
      throw new Error("CRUD Error: WorkSessions Not Deleted");
    }
    this.logger.info("WorkSessions found");
    return {
      result: deletedWorkSessions,
      deletedCount: deletedWorkSessions.deletedCount,
    };
  }

  public async DeleteAllWorkSessions(
    userId: string
  ): Promise<DeleteWriteOpResultObject> {
    const Delete = await this.WorkSessions.deleteMany({ user: userId })
      .lean()
      .exec();

    if (!Delete.deletedCount) {
      this.logger.error("CRUD Error: WorkSessions Not Deleted");
      throw new Error("CRUD Error: WorkSessions Not Deleted");
    }

    return {
      result: Delete,
      deletedCount: Delete.deletedCount,
    };
  }

  public async DeleteAllWorkSessionsForProject(
    userId: string,
    ProjectId: string
  ): Promise<DeleteWriteOpResultObject> {
    const Delete = await this.WorkSessions.deleteMany({
      user: userId,
      project: ProjectId,
    })
      .lean()
      .exec();
    if (!Delete.deletedCount) {
      this.logger.error("CRUD Error: WorkSessions Not Deleted");
      throw new Error("CRUD Error: WorkSessions Not Deleted");
    }
    return {
      result: Delete,
      deletedCount: Delete.deletedCount,
    };
  }
}
