import { HttpResponse, http as rest } from 'msw';
import API from '../../API';

export const MockSeedData = {
  Token: '123123',
};

export const SeedHandler = [
  rest.post(`${API}/seed`, ({}) =>
    HttpResponse.json({ token: MockSeedData.Token }),
  ),
  rest.get(`${API}/seed`, ({}) =>
    HttpResponse.json({
      token: MockSeedData.Token,
    }),
  ),
];
