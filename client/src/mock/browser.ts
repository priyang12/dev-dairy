import { setupWorker, rest } from 'msw';
import type { SetupWorkerApi } from 'msw';
import handlers from './handlers';

const worker = setupWorker(...handlers);

declare global {
  interface Window {
    msw: {
      worker: SetupWorkerApi;
      rest: typeof rest;
    };
    appReady: boolean;
  }
}

window.msw = {
  worker,
  rest,
};

export default worker;
