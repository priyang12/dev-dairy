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
    const Posts = await this.PostModel.find({ user: userId })
      .sort({
        date: -1,
      })
      .populate({
        path: "project",
        select: "title process roadMap",
      });

    if (!Posts) {
      this.logger.error("Posts not found");
      throw new Error("No Posts Found in Users");
    }
    this.logger.info("Posts Found");
    return Posts;
  }

  public async GetPostAggregate(userId: string): Promise<IPost[]> {
    const Posts = await this.PostModel.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $lookup: {
          from: "projects",
          let: {
            projectId: "$project",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$projectId"],
                },
              },
            },
            {
              $project: {
                _id: 0,
                title: 1,
                process: 1,
                date: 1,
                roadMap: {
                  $arrayElemAt: ["$roadMap._id", 0],
                },
              },
            },
          ],

          as: "project",
        },
      },
      {
        $sort: {
          date: -1,
        },
      },
    ]);

    if (!Posts) {
      this.logger.error("Posts not found");
      throw new Error("No Posts Found in Users");
    }

    this.logger.info("Posts Found");

    return Posts;
  }

  public async GetAllPostByProject(projectId: string): Promise<IPost[]> {
    const Posts = await this.PostModel.find({ project: projectId });
    if (!Posts) {
      this.logger.error("Posts not found");
      throw new Error("No Posts Found in Users");
    }
    this.logger.info("Posts Found");
    return Posts;
  }

  public async GetPostsWithPagination(
    userId: string,
    page: number,
    limit: number
  ): Promise<IPost[]> {
    const Posts = await this.PostModel.find({ user: userId })
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({
        date: -1,
      })
      .populate({
        path: "project",
        select: "title process",
      });

    if (!Posts) {
      this.logger.error("Posts not found");
      throw new Error("No Posts Found in Users");
    }
    this.logger.info("Posts Found");
    return Posts;
  }

  public async GetPost(UserId: string, PostId: string): Promise<IPost> {
    const post = await this.PostModel.findById({ _id: PostId, user: UserId });
    if (!post) {
      this.logger.error("post not found");
      throw new Error("No post Found");
    }
    this.logger.info("post Found");
    return post;
  }
  public async CreatePost(
    userId: string,
    post: IPost
  ): Promise<{
    result: boolean;
    message: string;
    post: IPost;
  }> {
    const newPost = await this.PostModel.create({
      ...post,
      user: userId,
    });
    this.logger.info("post Created");
    return {
      result: true,
      message: "post Created Successfully",
      post: newPost,
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
      this.logger.error("post not found");
      throw new Error("No post Found");
    }
    this.logger.info("post Updated");
    return {
      result: true,
      message: "post Updated Successfully",
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
