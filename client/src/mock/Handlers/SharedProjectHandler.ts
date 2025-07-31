import { HttpResponse, http as rest } from 'msw';
import API from '../../API';
import { AuthResponse, SingleProjectResponse } from '../MockedData';

export const MockedSharedProjectResponse = {
  ...SingleProjectResponse,
  user: AuthResponse.user,
};

export const MockedSharedProject = [
  rest.post(`${API}/shareProject`, ({}) =>
    HttpResponse.json({
      message: 'Project Shared Successfully',
      token: '123456789',
    }),
  ),
  rest.get(`${API}/shareProject/:id`, ({}) =>
    HttpResponse.json({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImI2ODgzOWU1LTY1NDUtNDk4OC1hNjk2LTgyNjFhZjUzMmExYiIsImlhdCI6MTY2NDMwOTcwNywiZXhwIjozMzI4ODcyMzA3fQ.TiNJXVux31YZj8gmausr0l0-3Kt4a8AzQn9eZS_9qAo',
      expirationTime: '2021-08-01T00:00:00.000Z',
    }),
  ),
  rest.get(`${API}/shareProject`, ({}) =>
    HttpResponse.json(MockedSharedProjectResponse),
  ),
  rest.delete(`${API}/shareProject/:id`, ({}) =>
    HttpResponse.json({
      acknowledged: true,
      deletedCount: 1,
    }),
  ),
];
