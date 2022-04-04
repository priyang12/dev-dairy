import { faker } from '@faker-js/faker';
import type { Post } from '../actions/interfaces';

// loop through and create a bunch of mock posts
const MockedPosts: Post[] = [];
// push user post
MockedPosts.push({
  _id: faker.datatype.uuid(),
  user: {
    _id: 'TNa9wHfCC5ZvtG0BT0gCSbNDZv82',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/300?img=7'
  },
  title: 'My first post',
  text: 'This is my first post',
  likes: [],
  comments: [],
  createdAt: faker.date.past().toISOString()
});
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
