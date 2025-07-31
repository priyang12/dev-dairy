import userEvent from '@testing-library/user-event';
import { HttpResponse, http as rest } from 'msw';
import { format, parseISO } from 'date-fns';
import { Route, Router, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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
    rest.get(`${API}/projects/:id`, ({ request: req }) =>
      HttpResponse.json({ message: 'No Project Found' }, { status: 404 }),
    ),
  );
  setup();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));

  expect(screen.getByText('No Project Found')).toBeInTheDocument();
});

it('Render Different Values', async () => {
  server.use(
    rest.get(`${API}/projects/:id`, ({ request: req }) =>
      HttpResponse.json(
        {
          ...SingleProjectResponse,
          live: false,
          website: '',
        },
        {
          status: 200,
        },
      ),
    ),
  );
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));

  expect(screen.getByText('Not Yet Deployed')).toBeInTheDocument();
});

it('Click on Edit Project', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  // Edit Project
  const editButton = screen.getByText('Edit Project');
  await userEvent.click(editButton);
  expect(History.location.pathname).toMatch(/EditProject/);
});

it('Delete Project', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  // Delete Project
  const deleteButton = screen.getByRole('button', {
    name: 'Delete Project',
  });
  await userEvent.click(deleteButton);
  expect(
    screen.getByText(/Are you sure you want to delete/),
  ).toBeInTheDocument();

  const ConfirmButton = screen.getByRole('button', { name: 'Delete' });

  await userEvent.click(ConfirmButton);

  const ConfirmInput = screen.getByTestId('confirm-input');
  await userEvent.type(ConfirmInput, `${SingleProjectResponse.title} Confirm`);

  const SubmitButton = screen.getByRole('button', { name: 'Delete' });

  await userEvent.click(SubmitButton);

  await waitForElementToBeRemoved(ConfirmButton);

  expect(History.location.pathname).toBe('/projects');

  await waitFor(() => {
    expect(
      screen.getByText('Project Deleted Successfully'),
    ).toBeInTheDocument();
  });

  expect(
    screen.queryByText(SingleProjectResponse.title),
  ).not.toBeInTheDocument();
});

it('Server Error on Delete Project', async () => {
  server.use(
    rest.delete(`${API}/projects/:id`, ({ request: req }) =>
      HttpResponse.json({ message: 'Server Error' }, { status: 401 }),
    ),
  );

  setup();

  await waitForElementToBeRemoved(screen.getByAltText('loading...'), {
    timeout: 2000,
  });

  // Delete Project
  const deleteButton = screen.getByRole('button', {
    name: 'Delete Project',
  });
  await userEvent.click(deleteButton);
  expect(
    screen.getByText(/Are you sure you want to delete/),
  ).toBeInTheDocument();

  const ConfirmButton = screen.getByRole('button', { name: 'Delete' });

  await userEvent.click(ConfirmButton);

  const ConfirmInput = screen.getByTestId('confirm-input');
  await userEvent.type(ConfirmInput, `${SingleProjectResponse.title} Confirm`);

  const SubmitButton = screen.getByRole('button', { name: 'Delete' });

  await userEvent.click(SubmitButton);

  await waitFor(() => {
    expect(screen.getByText('Server Error')).toBeInTheDocument();
  });
});
