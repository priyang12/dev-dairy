import { Service, Inject } from "typedi";
import { LeanDocument, Model } from "mongoose";
import { Logger } from "winston";
import { IWorkSessions } from "../models/WorkSessions";

@Service()
export default class UserService {
  constructor(
    @Inject("workSessionsModel") private WorkSessions: Model<IWorkSessions>,
    @Inject("logger") private logger: Logger
  ) {}

  public async GetWorkSessions(
    userId: string
  ): Promise<LeanDocument<IWorkSessions[]>> {
    const WorkSessions = await this.WorkSessions.find({ user: userId })
      .lean()
      .exec();
    if (!WorkSessions) {
      this.logger.error("WorkSessions not found");
      throw new Error("No WorkSessions Found in Users");
    }
    this.logger.info("WorkSessions Found");
    return WorkSessions;
  }

  public async GetWorkSession(
    userId: string,
    ProjectId: string
  ): Promise<LeanDocument<IWorkSessions>> {
    const WorkSessions = await this.WorkSessions.findOne({
      _id: ProjectId,
      user: userId,
    })
      .lean()
      .exec();
    if (!WorkSessions) {
      this.logger.error("WorkSessions not found");
      throw new Error("WorkSessions not found");
    }
    this.logger.info("WorkSessions found");
    return WorkSessions;
  }
  public async CreateWorkSession(
    userId: string,
    NewWorkSession: IWorkSessions
  ): Promise<LeanDocument<IWorkSessions>> {
    const newWorkSessions = this.WorkSessions.create({
      ...NewWorkSession,
      user: userId,
    });

    if (!newWorkSessions) {
      this.logger.error("WorkSessions not found");
      throw new Error("WorkSessions not found");
    }
    this.logger.info("WorkSessions found");
    return newWorkSessions;
  }
  public async PushWorkSession(
    userId: string,
    ProjectId: string,
    NewWorkSession: IWorkSessions
  ) {
    const newWorkSessions = this.WorkSessions.findOneAndUpdate(
      { _id: ProjectId, user: userId },
      { $push: { session: NewWorkSession } },
      { new: true }
    );
    if (!newWorkSessions) {
      this.logger.error("WorkSessions not found");
      throw new Error("WorkSessions not found");
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
      this.logger.error("WorkSessions not found");
      throw new Error("WorkSessions not found");
    }
    this.logger.info("WorkSessions found");
    return updatedWorkSessions;
  }
  public async DeleteWorkSession(
    userId: string,
    WordSessionId: string
  ): Promise<LeanDocument<IWorkSessions>> {
    const deletedWorkSessions = await this.WorkSessions.findOneAndDelete({
      _id: WordSessionId,
      user: userId,
    })
      .lean()
      .exec();
    if (!deletedWorkSessions) {
      this.logger.error("WorkSessions not found");
      throw new Error("WorkSessions not found");
    }
    this.logger.info("WorkSessions found");
    return deletedWorkSessions;
  }

  public async DeleteAllWorkSessions(
    userId: string
  ): Promise<
    {
      ok?: number | undefined;
      n?: number | undefined;
    } & {
      deletedCount?: number | undefined;
    }
  > {
    const Delete = await this.WorkSessions.deleteMany({ user: userId })
      .lean()
      .exec();
    return Delete;
  }

  public async DeleteAllWorkSessionsForProject(
    userId: string,
    ProjectId: string
  ): Promise<
    {
      ok?: number | undefined;
      n?: number | undefined;
    } & {
      deletedCount?: number | undefined;
    }
  > {
    const Delete = await this.WorkSessions.deleteMany({
      user: userId,
      project: ProjectId,
    })
      .lean()
      .exec();
    return Delete;
  }
}
