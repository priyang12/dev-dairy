import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { SingleProjectResponse } from '../../mock/MockedData';

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
it('Delete Project', async () => {
  setup();
  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  expect(screen.getByText(/Edit Project/)).toBeInTheDocument();
  const deleteButton = screen.getByRole('button', { name: 'Delete Project' });
  userEvent.click(deleteButton);
  await waitFor(() => {
    expect(screen.getByText(/Confirm Delete Project/)).toBeInTheDocument();
  });
  const confirmButton = screen.getByRole('button', { name: 'Delete' });
  userEvent.click(confirmButton);

  await waitForElementToBeRemoved(screen.getByText('Deleting...'));

  expect(History.location.pathname).toBe('/projects');
});

it('Add RoadMap', async () => {
  setup();
  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  expect(screen.getByText(/Edit Project/)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Add New RoadMap' }));

  const RoadMapName = screen.getByLabelText('RoadMap Name');
  // Empty RoadMapName
  userEvent.type(RoadMapName, '');

  const SubmitRoadmap = screen.getByRole('button', { name: 'Submit RoadMap' });
  userEvent.click(SubmitRoadmap);

  expect(screen.getByText(/Please enter a RoadMap name/)).toBeInTheDocument();

  userEvent.type(RoadMapName, 'Test RoadMap');
  userEvent.click(SubmitRoadmap);

  await waitForElementToBeRemoved(screen.getByText('Adding RoadMap'));

  expect(screen.getByText(/New RoadMap Added/)).toBeInTheDocument();
});
