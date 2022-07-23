import { rest } from 'msw';
import API from '../API';
import {
  AuthResponse,
  MockedRoadMap,
  MockedRoadMapResponse,
  NewPostResponse,
  NewProjectResponse,
  PostsResponse,
  ProjectsResponse,
  SingleProjectResponse,
  MockedAllWorkSessions,
  MockedProjectWorkSessions,
  MockedCreateWorkSession,
  MockPushWorkSession,
  MockPullWorkSession,
} from './MockedData';

const handlers = [
  rest.post(`${API}/login`, (req, res, ctx) => res(ctx.json(AuthResponse))),
  rest.post(`${API}/register`, (req, res, ctx) => res(ctx.json(AuthResponse))),
  rest.get(`${API}/user/me`, (req, res, ctx) => res(ctx.json(AuthResponse.user))),
  rest.post(`${API}/posts`, (req, res, ctx) => res(ctx.delay(1000), ctx.json(NewPostResponse))),
  rest.get(`${API}/posts`, (req, res, ctx) => res(ctx.delay(1000), ctx.json(PostsResponse))),
  rest.get(`${API}/posts/:id`, (req, res, ctx) => res(ctx.json(PostsResponse[0]))),

  rest.put(`${API}/posts/:id`, (req, res, ctx) => res(
    ctx.json({
      result: true,
      message: 'Post Updated Successfully',
    }),
  )),
  rest.delete(`${API}/posts/:id`, (req, res, ctx) => res(
    ctx.json({
      result: true,
      message: 'Post Deleted Successfully',
    }),
  )),
  // Projects
  rest.get(`${API}/projects`, (req, res, ctx) => res(ctx.json(ProjectsResponse))),
  rest.get(`${API}/projects/:id`, (req, res, ctx) => res(ctx.json(SingleProjectResponse))),
  rest.post(`${API}/projects`, (req, res, ctx) => res(ctx.json(NewProjectResponse))),
  rest.put(`${API}/projects/:id`, (req, res, ctx) => res(
    ctx.json({
      result: true,
      message: 'Project Updated Successfully',
    }),
  )),
  rest.delete(`${API}/projects/:id`, (req, res, ctx) => res(
    ctx.json({
      result: true,
      message: 'Project Deleted Successfully',
    }),
  )),
  rest.get(`${API}/projects/:id/roadMap`, (req, res, ctx) => res(ctx.json(MockedRoadMap))),
  rest.put(`${API}/projects/:id/roadMap`, (req, res, ctx) => res(ctx.json(MockedRoadMapResponse))),
  rest.patch(`${API}/projects/:id/roadMap`, (req, res, ctx) => res(
    ctx.json({
      result: true,
      message: 'RoadMap Updated',
    }),
  )),
  rest.delete(`${API}/projects/:id/roadMap`, (req, res, ctx) => res(
    ctx.json({
      result: true,
      message: 'Roadmap from New Projectg is deleted',
    }),
  )),
  rest.get(`${API}/workSession`, (req, res, ctx) => res(ctx.json(MockedAllWorkSessions))),
  rest.get(`${API}/workSession/project/:id`, (req, res, ctx) => res(ctx.json(MockedProjectWorkSessions))),
  rest.patch(`${API}/workSession/:id/push`, (req, res, ctx) => res(ctx.json(MockPushWorkSession))),
  rest.patch(`${API}/workSession/:id/pull`, (req, res, ctx) => res(ctx.json(MockPullWorkSession))),

  rest.delete(`${API}/workSession/project/:id`, (req, res, ctx) => res(
    ctx.delay(5000),
    ctx.json({
      result: true,
      message: 'Work Session Deleted Successfully',
    }),
  )),
  rest.delete(`${API}/workSession`, (req, res, ctx) => res(
    ctx.json({
      result: true,
      message: 'Work Session Deleted Successfully',
    }),
  )),
];

export default handlers;
