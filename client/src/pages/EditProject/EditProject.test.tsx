import { BrowserRouter } from 'react-router-dom';
import { SingleProjectResponse } from '../../mock/MockedData';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';
import EditProject from './EditProject';

const setup = () =>
  render(
    <BrowserRouter>
      <EditProject />
    </BrowserRouter>,
  );

it('Render EditProject', async () => {
  setup();
  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  expect(screen.getByText(/Edit Project/)).toBeInTheDocument();
  expect(
    screen.getByText(SingleProjectResponse.description),
  ).toBeInTheDocument();
});

it('Render EditProject with error', async () => {
  setup();
  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  expect(screen.getByText(/Edit Project/)).toBeInTheDocument();
  expect(
    screen.getByText(SingleProjectResponse.description),
  ).toBeInTheDocument();
  expect(screen.getByText(/Error/)).toBeInTheDocument();
});

// Need to test delete project and add/delete roadMap
