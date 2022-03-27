import { rest } from 'msw';
import { MockedPosts } from './MockPost';

export const handlers = [
  rest.get('/api/post', (_, res, ctx) => {
    return res(ctx.delay(100), ctx.json(MockedPosts));
  }),
];
