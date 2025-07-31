import '@testing-library/jest-dom';
import server from './mock/server';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', {
  value: noop,
  writable: true,
});

(global as any).ResizeObserver = class ResizeObserver {
  constructor() {
    // listener = ls;
  }

  observe() {}

  unobserve() {}

  disconnect() {}
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
