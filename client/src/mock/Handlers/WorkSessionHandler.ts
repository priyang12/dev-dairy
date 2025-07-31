import { HttpResponse, http as rest } from 'msw';
import API from '../../API';
import {
  MockedAllWorkSessions,
  MockedProjectWorkSessions,
  MockPullWorkSession,
  MockPushWorkSession,
} from '../MockedData';

export const WorkSessions = [
  rest.get(`${API}/workSession`, ({}) =>
    HttpResponse.json(MockedAllWorkSessions),
  ),
  rest.get(`${API}/workSession/project/:id`, ({}) =>
    HttpResponse.json(MockedProjectWorkSessions),
  ),
  rest.patch(`${API}/workSession/:id/push`, ({}) =>
    HttpResponse.json(MockPushWorkSession),
  ),
  rest.patch(`${API}/workSession/:id/pull`, ({}) =>
    HttpResponse.json(MockPullWorkSession),
  ),

  rest.delete(`${API}/workSession/project/:id`, ({}) =>
    HttpResponse.json({
      result: true,
      message: 'Work Session Deleted Successfully',
    }),
  ),
  rest.delete(`${API}/workSession`, ({}) =>
    HttpResponse.json({
      result: true,
      message: 'Work Session Deleted Successfully',
    }),
  ),
];
