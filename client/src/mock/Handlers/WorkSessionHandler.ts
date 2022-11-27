import { rest } from 'msw';
import API from '../../API';
import {
  MockedAllWorkSessions,
  MockedProjectWorkSessions,
  MockPullWorkSession,
  MockPushWorkSession,
} from '../MockedData';

export const WorkSessions = [
  rest.get(`${API}/workSession`, (req, res, ctx) =>
    res(ctx.json(MockedAllWorkSessions)),
  ),
  rest.get(`${API}/workSession/project/:id`, (req, res, ctx) =>
    res(ctx.json(MockedProjectWorkSessions)),
  ),
  rest.patch(`${API}/workSession/:id/push`, (req, res, ctx) =>
    res(ctx.json(MockPushWorkSession)),
  ),
  rest.patch(`${API}/workSession/:id/pull`, (req, res, ctx) =>
    res(ctx.json(MockPullWorkSession)),
  ),

  rest.delete(`${API}/workSession/project/:id`, (req, res, ctx) =>
    res(
      ctx.json({
        result: true,
        message: 'Work Session Deleted Successfully',
      }),
    ),
  ),
  rest.delete(`${API}/workSession`, (req, res, ctx) =>
    res(
      ctx.json({
        result: true,
        message: 'Work Session Deleted Successfully',
      }),
    ),
  ),
];
