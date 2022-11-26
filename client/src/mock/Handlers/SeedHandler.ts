import { rest } from 'msw';
import API from '../../API';

export const MockSeedData = {
  Token: '123123',
};

export const SeedHandler = [
  rest.post(`${API}/seed`, (req, res, ctx) =>
    res(
      ctx.json({
        token: MockSeedData.Token,
      }),
    ),
  ),
  rest.get(`${API}/seed`, (req, res, ctx) =>
    res(
      ctx.json({
        token: MockSeedData.Token,
      }),
    ),
  ),
];
