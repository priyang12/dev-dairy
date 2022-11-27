import { faker } from "@faker-js/faker";
import { IUser } from "../models/User";

export const TestUser: Omit<IUser, "_id" | "date"> = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password() as string,
  ImageUrl: faker.internet.avatar(),
};
