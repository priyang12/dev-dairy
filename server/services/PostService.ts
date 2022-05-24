import { Service, Inject } from "typedi";
import { Model } from "mongoose";
import { Logger } from "winston";
import { IPost } from "../models/Post";

@Service()
export default class PostService {
  constructor(
    @Inject("postModel") private PostModel: Model<IPost>,
    @Inject("logger") private logger: Logger
  ) {}

  public async GetAllPost(userId: string): Promise<IPost[]> {
    const Posts = await this.PostModel.find({ user: userId }).populate(
      "project",
      "title process"
    );

    if (!Posts) {
      this.logger.error("Projects not found");
      throw new Error("No Projects Found in Users");
    }
    this.logger.info("Projects Found");
    return Posts;
  }

  public async GetAllPostByProject(projectId: string): Promise<IPost[]> {
    const Posts = await this.PostModel.find({ project: projectId });
    if (!Posts) {
      this.logger.error("Projects not found");
      throw new Error("No Projects Found in Users");
    }
    this.logger.info("Projects Found");
    return Posts;
  }

  public async GetPost(UserId: string, PostId: string): Promise<IPost> {
    const post = await this.PostModel.findById({ _id: PostId, user: UserId });
    if (!post) {
      this.logger.error("Project not found");
      throw new Error("No Project Found");
    }
    this.logger.info("Project Found");
    return post;
  }
  public async CreatePost(
    userId: string,
    post: IPost
  ): Promise<{
    result: boolean;
    message: string;
  }> {
    const newPost = await this.PostModel.create({
      ...post,
      user: userId,
    });
    this.logger.info("Project Created");
    return {
      result: true,
      message: "Project Created Successfully",
    };
  }
  public async UpdatePost(
    userId: string,
    postId: string,
    post: IPost
  ): Promise<{
    result: boolean;
    message: string;
  }> {
    const updatedPost = await this.PostModel.findOneAndUpdate(
      { _id: postId, user: userId },
      post,
      { new: true }
    );
    if (!updatedPost) {
      this.logger.error("Project not found");
      throw new Error("No Project Found");
    }
    this.logger.info("Project Updated");
    return {
      result: true,
      message: "Project Updated Successfully",
    };
  }
  public async DeletePost(
    userId: string,
    postId: string
  ): Promise<{
    result: boolean;
    message: string;
  }> {
    const deletedPost = await this.PostModel.findOneAndDelete({
      _id: postId,
      user: userId,
    });
    if (!deletedPost) {
      this.logger.error("Post not found");
      throw new Error("No Post Found");
    }
    this.logger.info("Post Deleted");
    return {
      result: true,
      message: "Post Deleted Successfully",
    };
  }
}
