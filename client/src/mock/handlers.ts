import { rest } from 'msw';
import MockedPosts from './MockPost';

const handlers = [
  rest.get('/api/posts', (req, res, ctx) => res(ctx.json(MockedPosts))),
  rest.post('/api/posts', (req, res, ctx) => res(ctx.json(MockedPosts[0]))),

  rest.delete('/api/post/:id', (req, res, ctx) =>
    res(
      ctx.json({
        message: 'Post Deleted',
      }),
    ),
  ),
  // api/post/like
  rest.put('/api/post/like/:id', (req, res, ctx) =>
    res(
      ctx.json({
        message: 'Post liked',
      }),
    ),
  ),
  rest.put('/api/post/unlike/:id', (req, res, ctx) =>
    res(
      ctx.json({
        message: 'Post unliked',
      }),
    ),
  ),
];

export default handlers;
