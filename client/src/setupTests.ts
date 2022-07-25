// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import server from './mock/server';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', {
  value: noop,
  writable: true,
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
