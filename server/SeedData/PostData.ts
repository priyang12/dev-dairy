import { IPost } from "../models/Post";
import { faker } from "@faker-js/faker";

const status = ["In-Process", "Not Started", "Started", "Done"] as const;

export const PostFn = (
  userId: string,
  projectId: string,
  roadMapId: string
): Omit<IPost, "_id" | "date"> => {
  return {
    user: userId,
    project: projectId,
    roadMap: roadMapId,
    title: faker.random.words(10),
    description: faker.random.words(30),
    status:
      status[
        faker.datatype.number({
          max: 3,
        })
      ],
  };
};
