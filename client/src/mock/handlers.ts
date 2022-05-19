import { rest } from 'msw';
import API from '../API';
import { AuthResponse, NewPostResponse, PostsResponse } from './MockedData';

const handlers = [
  rest.post(`/mock/login`, (req, res, ctx) => res(ctx.json(AuthResponse))),
  rest.post(`${API}/register`, (req, res, ctx) => res(ctx.json(AuthResponse))),
  rest.get(`${API}/user/me`, (req, res, ctx) =>
    res(ctx.json(AuthResponse.user)),
  ),
  rest.post(`${API}/posts`, (req, res, ctx) => res(ctx.json(NewPostResponse))),
  rest.get(`${API}/posts`, (req, res, ctx) => res(ctx.json(PostsResponse))),
  rest.get(`${API}/posts/:id`, (req, res, ctx) =>
    res(ctx.json(PostsResponse[0])),
  ),
  rest.get(`${API}/project/:id`, (req, res, ctx) =>
    res(ctx.json(PostsResponse)),
  ),
  rest.put(`${API}/posts/:id`, (req, res, ctx) =>
    res(
      ctx.json({
        result: true,
        message: 'Post Updated Successfully',
      }),
    ),
  ),
  rest.delete(`${API}/posts/:id`, (req, res, ctx) =>
    res(
      ctx.json({
        result: true,
        message: 'Post Deleted Successfully',
      }),
    ),
  ),
];

export default handlers;
