import { rest } from 'msw';
import API from '../../API';
import { SingleProjectResponse } from '../MockedData';

export const MockedSharedProject = [
  rest.post(`${API}/shareProject`, (req, res, ctx) =>
    res(
      ctx.json({
        message: 'Project Shared Successfully',
        token: '123456789',
      }),
    ),
  ),
  rest.get(`${API}/shareProject/:id`, (req, res, ctx) =>
    res(
      ctx.json({
        token: '123456789',
        expirationTime: '2021-08-01T00:00:00.000Z',
      }),
    ),
  ),
  rest.get(`${API}/shareProject`, (req, res, ctx) =>
    res(ctx.json(SingleProjectResponse)),
  ),
  rest.delete(`${API}/shareProject/:id`, (req, res, ctx) =>
    res(
      ctx.json({
        acknowledged: true,
        deletedCount: 1,
      }),
    ),
  ),
];
