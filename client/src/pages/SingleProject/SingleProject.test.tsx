import moment from 'moment';
import { rest } from 'msw';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';
import { SingleProjectResponse } from '../../mock/MockedData';
import SingleProject from './index';
import server from '../../mock/server';
import API from '../../API';

const History = createMemoryHistory();

const setup = (): any => {
  render(
    <Router navigator={History} location="/">
      <SingleProject />
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
      moment(SingleProjectResponse.date).format('D MMM YYYY, h:mm:ss'),
    ),
  ).toBeInTheDocument();
  SingleProjectResponse.roadMap.forEach((roadMap: any) => {
    expect(screen.getByText(roadMap.name)).toBeInTheDocument();
  });
  SingleProjectResponse.technologies.forEach((tech: any) => {
    expect(screen.getByText(tech)).toBeInTheDocument();
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
  const editButton = screen.getByRole('button', { name: 'Edit Project' });
  userEvent.click(editButton);
  expect(History.location.pathname).toMatch(/EditProject/);
});
