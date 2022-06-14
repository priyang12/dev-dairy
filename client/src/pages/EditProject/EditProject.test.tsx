import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { Router, Route } from 'react-router-dom';
import { SingleProjectResponse } from '../../mock/MockedData';
import server from '../../mock/server';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';
import EditProject from './EditProject';

const route = '/EditProject/132';
const History = createMemoryHistory({ initialEntries: [route] });

const setup = () =>
  render(
    <Router location={route} navigator={History}>
      <EditProject />
    </Router>,
  );

it('Render EditProject', async () => {
  setup();
  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  expect(screen.getByText(/Edit Project/)).toBeInTheDocument();
  expect(
    screen.getByText(SingleProjectResponse.description),
  ).toBeInTheDocument();
});

// Need to test delete project and add/delete roadMap
