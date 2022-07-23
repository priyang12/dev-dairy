import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router, Routes } from 'react-router-dom';
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
      <Routes>
        <Route path="/EditProject/:id" element={<EditProject />} />
      </Routes>
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
  const deleteButton = screen.getByRole('button', {
    name: 'Delete Project',
  });
  userEvent.click(deleteButton);
  await waitFor(() => {
    expect(screen.getByText(/Confirm Delete Project/)).toBeInTheDocument();
  });
  const confirmButton = screen.getByRole('button', {
    name: 'Delete',
  });
  userEvent.click(confirmButton);

  await waitForElementToBeRemoved(screen.getByText('Deleting...'));

  expect(History.location.pathname).toBe('/projects');
});
