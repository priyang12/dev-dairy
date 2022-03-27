import { rest } from 'msw';

export const handlers = [
  rest.get('/api/v1/todos', (_, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.json([
        {
          id: '1',
          title: 'Mocked API',
          done: false,
        },
        {
          id: '2',
          title: 'Task Two',
          done: false,
        },
        {
          id: '3',
          title: 'Task Three',
          done: false,
        },
      ]),
    );
  }),
];
