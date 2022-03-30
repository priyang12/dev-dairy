import { faker } from '@faker-js/faker';
import type { Post } from '../actions/interfaces';

// loop through and create a bunch of mock posts
const MockedPosts: Post[] = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 3; i++) {
  MockedPosts.push({
    _id: faker.datatype.uuid(),
    user: {
      _id: faker.datatype.uuid(),
      name: faker.name.findName(),
      avatar: faker.image.avatar()
    },
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    likes: [],
    comments: [],
    createdAt: faker.date.past().toISOString()
  });
}

export default MockedPosts;
