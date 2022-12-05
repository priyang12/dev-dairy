import { faker } from "@faker-js/faker";
import { IProject, IRoadMap } from "../models/Project";

const RoadMap = (): Omit<IRoadMap, "_id"> => {
  return {
    name: faker.random.word(),
    color: faker.color.rgb({ format: "hex", casing: "lower" }),
    progress: faker.datatype.number({
      min: 10,
      max: 100,
    }),
  };
};

const ProjectFn = (id: string): Omit<IProject, "_id"> => {
  return {
    user: id,
    title: "Fake Project",
    description: faker.random.words(10),
    process: faker.datatype.number({
      min: 10,
      max: 100,
    }),
    technologies: ["react", "Node.js"],
    github: "https://github.com/priyang12/Dev-hub",
    live: true,
    roadMap: [RoadMap(), RoadMap(), RoadMap()],
  };
};

export const CreateProjects = (id: string) => {
  const Projects = [];
  for (let index = 0; index < 5; index++) {
    Projects.push(ProjectFn(id));
  }
  return Projects;
};
