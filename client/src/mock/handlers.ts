import { rest } from 'msw';
import MockedPosts from './MockPost';

const handlers = [
  rest.get('/api/posts', (req, res, ctx) => res(ctx.json(MockedPosts))),
];

export default handlers;
