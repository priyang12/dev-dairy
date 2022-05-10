import { rest } from 'msw';
import MockedPosts from './MockPost';

const handlers = [
  rest.get('/api/posts', (req, res, ctx) => res(ctx.json(MockedPosts))),
  rest.get('/api/posts/:id', (req, res, ctx) => res(ctx.json(MockedPosts[0]))),

  rest.delete('/api/post/:id', (req, res, ctx) =>
    res(
      ctx.json({
        message: 'Post Deleted',
      }),
    ),
  ),
  // api/post/like
  rest.put('/api/posts/like/:id', (req, res, ctx) =>
    res(
      ctx.json({
        message: 'Post liked',
      }),
    ),
  ),
  rest.put('/api/posts/unlike/:id', (req, res, ctx) =>
    res(
      ctx.json({
        message: 'Post unliked',
      }),
    ),
  ),
  // api/post/comment
  rest.post('/api/posts/comment/:id', (req, res, ctx) =>
    res(
      ctx.json({
        message: 'Comment posted',
      }),
    ),
  ),
];

export default handlers;
