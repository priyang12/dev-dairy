import { setupWorker, SetupWorkerApi } from 'msw/browser';
import type { http } from 'msw';
import handlers from './handlers';

const worker = setupWorker(...handlers);

export default worker;
