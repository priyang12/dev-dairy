import '@testing-library/jest-dom';
import server from './mock/server';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', {
  value: noop,
  writable: true,
});

// ignore for not sure what it is.
// (global as any).ResizeObserver = class ResizeObserver {

//   constructor() {
//     // listener = ls;
//   }

//   observe() {}

//   unobserve() {}

//   disconnect() {}
// };

// need to fix mock setup for vite
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
