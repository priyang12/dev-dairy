import { faker } from "@faker-js/faker";

export const WorkSessionFn = () => {
  const WorkSessions = [];

  const LoopSize = faker.datatype.number({
    max: 10,
  });

  for (let index = 0; index < LoopSize; index++) {
    WorkSessions.push({
      Time: faker.datatype.number({
        min: 5000,
      }),
    });
  }
};
