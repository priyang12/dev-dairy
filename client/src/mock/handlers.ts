import { rest } from 'msw';
import API from '../API';
import {
  AuthResponse,
  NewPostResponse,
  PostsResponse,
  ProjectsResponse,
  SingleProjectResponse,
} from './MockedData';

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
  rest.get(`${API}/projects/:id`, (req, res, ctx) =>
    res(ctx.json(SingleProjectResponse)),
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
  // Projects
  rest.get(`${API}/projects`, (req, res, ctx) =>
    res(ctx.json(ProjectsResponse)),
  ),
  rest.post(`${API}/projects`, (req, res, ctx) =>
    res(
      ctx.json({
        result: true,
        message: 'Project Created Successfully',
      }),
    ),
  ),
  rest.put(`${API}/projects/:id`, (req, res, ctx) =>
    res(
      ctx.json({
        result: true,
        message: 'Project Updated Successfully',
      }),
    ),
  ),
  rest.delete(`${API}/projects/:id`, (req, res, ctx) =>
    res(
      ctx.json({
        result: true,
        message: 'Project Deleted Successfully',
      }),
    ),
  ),
  rest.patch(`${API}/projects/:id/roadMap`, (req, res, ctx) =>
    res(
      ctx.json({
        _id: '5f5d8f9b9b9b9b9b9b9b9b9b',
        result: true,
        message: 'New RoadMap Added Successfully',
      }),
    ),
  ),
];

export default handlers;
