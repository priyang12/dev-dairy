import { faker } from '@faker-js/faker';
import { Post } from '../actions/interfaces';

// loop through and create a bunch of mock posts
export const MockedPosts: Post[] = [];
for (let i = 0; i < 3; i++) {
  MockedPosts.push({
    _id: faker.datatype.uuid(),
    user: {
      _id: faker.datatype.uuid(),
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
    },
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    likes: [],
    comments: [],
    createdAt: faker.date.past().toISOString(),
  });
}
