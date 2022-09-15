import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { Route, Router, Routes } from 'react-router-dom';
import API from '../../API';
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

const Render = () =>
  render(
    <Router location={route} navigator={History}>
      <Routes>
        <Route path="/EditProject/:id" element={<EditProject />} />
      </Routes>
    </Router>,
  );

const setup = async () => {
  await Render();

  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  screen.debug();
  expect(screen.getByText(/Edit Project/)).toBeInTheDocument();
  const Title = screen.getByLabelText(/Title/);
  const Description = screen.getByLabelText(/Description/);
  const Process = screen.getByLabelText(/Process/);
  const Github = screen.getByLabelText(/Github/);
  const Live = screen.getByLabelText(/Live/);
  const Website = screen.getByLabelText(/Website/);
  const updateButton = screen.getByText(/Update Project/);
  return {
    Title,
    Description,
    Process,
    Github,
    Live,
    Website,
    updateButton,
  };
};

it('Render EditProject', async () => {
  await setup();
  expect(
    screen.getByDisplayValue(SingleProjectResponse.title),
  ).toBeInTheDocument();
  expect(
    screen.getByDisplayValue(SingleProjectResponse.description),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/Process/).getAttribute('value')).toBe(
    SingleProjectResponse.process.toString(),
  );
  expect(
    screen.getByDisplayValue(SingleProjectResponse.github),
  ).toBeInTheDocument();
  expect(
    screen.getByDisplayValue(SingleProjectResponse.website),
  ).toBeInTheDocument();
});

it('Field Validation', async () => {
  const { Title, Description, Github, Live, Website, updateButton } =
    await setup();

  await userEvent.clear(Title);
  await userEvent.clear(Description);
  await userEvent.clear(Github);
  await userEvent.click(Live);
  await userEvent.clear(Website);
  await userEvent.click(updateButton);

  expect(screen.getByText(/DESCRIPTION is required/)).toBeInTheDocument();
  expect(screen.getByText(/WEBSITE is required/)).toBeInTheDocument();
  expect(screen.getByText(/GITHUB is required/)).toBeInTheDocument();
});

it('Update Edit Project', async () => {
  const { Title, Description, Process, Github, Live, Website, updateButton } =
    await setup();

  await userEvent.type(Title, 'New Title');
  await userEvent.type(Description, 'New Description');
  await userEvent.type(Process, '10');
  await userEvent.type(Github, 'New Github');
  await userEvent.click(Live);
  await userEvent.type(Website, 'New Website');

  await userEvent.click(updateButton);

  await waitFor(() => {
    screen.getByText(/Updating Project/);
  });
  await waitFor(() => {
    screen.getByText(/Project Updated Successfully/);
  });
});

it('Test Edit Project Put Request', async () => {
  server.use(
    rest.put(`${API}/projects/:id`, (req, res, ctx) =>
      res(
        ctx.status(403),
        ctx.json({
          result: false,
          message: 'Server Error While Updating Project',
        }),
      ),
    ),
  );
  const { updateButton } = await setup();
  await userEvent.click(updateButton);
  await waitFor(() => {
    screen.getByText(/Server Error While Updating Project/);
  });
});

it('Test Edit Project Get Error', async () => {
  server.use(
    rest.get(`${API}/projects/:id`, (req, res, ctx) =>
      res(
        ctx.status(403),
        ctx.json({
          result: false,
          message: 'Server Error',
        }),
      ),
    ),
  );
  Render();
  await waitFor(() => {
    screen.getByText(/Something went wrong/);
  });
});
