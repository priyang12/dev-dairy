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
      this.logger.error("Posts Not Found");
      throw new Error("Posts Not Found");
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
      this.logger.error("Posts Not Found");
      throw new Error("Posts Not Found");
    }

    this.logger.info("Posts Found");

    return Posts;
  }

  public async GetAllPostByProject(projectId: string): Promise<IPost[]> {
    const Posts = await this.PostModel.find({ project: projectId });
    if (!Posts) {
      this.logger.error("Posts Not Found");
      throw new Error("Posts Not Found");
    }
    this.logger.info("Posts Found");
    return Posts;
  }

  public async GetPostsWithFilter(
    userId: string,
    status: any,
    page: number,
    limit: number,
    Select?: string,
    ProjectSelect?: string,
    Sort?: string
  ) {
    const Posts = await this.PostModel.find({
      user: userId,
      status,
    })
      .skip(limit * (page - 1))
      .limit(limit)
      .select(Select)
      .sort(
        Sort || {
          date: -1,
        }
      )
      .populate({
        path: "project",
        select: ProjectSelect || "title process",
      });

    if (!Posts) {
      this.logger.error("Posts Not Found");
      throw new Error("Posts Not Found");
    }
    this.logger.info("Posts Found");
    return Posts;
  }

  public async GetPostsWithPagination(
    userId: string,
    page: number,
    limit: number,
    Select?: string,
    ProjectSelect?: string,
    Sort?: string
  ): Promise<IPost[]> {
    const Posts = await this.PostModel.find({ user: userId })
      .skip(limit * (page - 1))
      .limit(limit)
      .select(Select)
      .sort(
        Sort || {
          date: -1,
        }
      )
      .populate({
        path: "project",
        select: ProjectSelect || "title process",
      });

    if (!Posts) {
      this.logger.error("Posts Not Found");
      throw new Error("Posts Not Found");
    }
    this.logger.info("Posts Found");
    return Posts;
  }

  public async GetPost(UserId: string, PostId: string): Promise<IPost> {
    const post = await this.PostModel.findById({ _id: PostId, user: UserId });
    if (!post) {
      this.logger.error("Post Not Found");
      throw new Error("Post Not Found");
    }
    this.logger.info("Post Not Found");
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
    this.logger.info("Post Created");
    if (!newPost) {
      this.logger.error("CRUD Error: Post Not Created");
      throw new Error("CRUD Error: Post Not Created");
    }
    return {
      result: true,
      message: "Post Created Successfully",
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
      this.logger.error("CRUD Error: Post Not Found");
      throw new Error("CRUD Error: Post Not Updated");
    }
    this.logger.info("Post Updated");
    return {
      result: true,
      message: "Post Updated Successfully",
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
      this.logger.error("CRUD Error: Post Not Deleted");
      throw new Error("CRUD Error: Post Not Deleted");
    }
    this.logger.info("Post Deleted");
    return {
      result: true,
      message: "Post Deleted Successfully",
    };
  }
}
