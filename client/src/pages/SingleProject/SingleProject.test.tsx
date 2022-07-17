import { rest } from 'msw';
import { format, parseISO } from 'date-fns';
import { Route, Router, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';
import { SingleProjectResponse } from '../../mock/MockedData';
import SingleProject from './index';
import server from '../../mock/server';
import API from '../../API';

const route = '/Projects/132';
const History = createMemoryHistory({ initialEntries: [route] });

const setup = (): any => {
  render(
    <Router navigator={History} location={route}>
      <Routes>
        <Route path="/Projects/:id" element={<SingleProject />} />
      </Routes>
    </Router>,
  );
};

it('render Single Project', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));

  expect(screen.getByText(SingleProjectResponse.title)).toBeInTheDocument();
  expect(
    screen.getByText(SingleProjectResponse.description),
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      format(parseISO(SingleProjectResponse.date), "yyyy-MM-dd'T'HH:mm"),
    ),
  ).toBeInTheDocument();
  SingleProjectResponse.roadMap.forEach((roadMap: any) => {
    expect(screen.getByText(roadMap.name.toUpperCase())).toBeInTheDocument();
  });

  SingleProjectResponse.technologies.forEach((tech: any) => {
    expect(screen.getAllByText(tech)[0]).toBeInTheDocument();
  });
});
it('render Empty Project', async () => {
  server.use(
    rest.get(`${API}/projects/:id`, (req, res, ctx) =>
      res(ctx.status(404), ctx.json({ message: 'No Project Found' })),
    ),
  );
  setup();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));

  expect(screen.getByText('No Project Found')).toBeInTheDocument();
});

it('Render Different Values', async () => {
  server.use(
    rest.get(`${API}/projects/:id`, (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          ...SingleProjectResponse,
          live: false,
          website: '',
        }),
      ),
    ),
  );
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));

  expect(screen.getByText('Not Yet Deployed')).toBeInTheDocument();
});
it('Delete Project', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  // Delete Project
  const deleteButton = screen.getByRole('button', { name: 'Delete Project' });
  userEvent.click(deleteButton);
  expect(
    screen.getByText('Are you sure you want to delete this project?'),
  ).toBeInTheDocument();
  const cancelButton = screen.getByRole('button', { name: 'Delete' });
  userEvent.click(cancelButton);
  await waitForElementToBeRemoved(screen.getByText('Deleting...'));

  expect(History.location.pathname).toBe('/projects');
});
it('Click on Edit Project', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  // Edit Project
  const editButton = screen.getByText('Edit Project');
  userEvent.click(editButton);
  expect(History.location.pathname).toMatch(/EditProject/);
});

it('Server Error on Delete', async () => {
  server.use(
    rest.delete(`${API}/projects/:id`, (req, res, ctx) =>
      res(ctx.status(401), ctx.json({ message: 'Server Error' })),
    ),
  );

  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  // Delete Project

  const deleteButton = screen.getByRole('button', { name: 'Delete Project' });
  userEvent.click(deleteButton);
  expect(
    screen.getByText('Are you sure you want to delete this project?'),
  ).toBeInTheDocument();
  const cancelButton = screen.getByRole('button', { name: 'Delete' });
  userEvent.click(cancelButton);

  await waitFor(() => {
    expect(screen.getByText('Server Error')).toBeInTheDocument();
  });
});
