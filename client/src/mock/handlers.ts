import { rest } from 'msw';
import MockedPosts from './MockPost';

const handlers = [
  rest.get('/api/post', (_, res, ctx) =>
    res(ctx.delay(100), ctx.json(MockedPosts))
  
];
export default handlers;
