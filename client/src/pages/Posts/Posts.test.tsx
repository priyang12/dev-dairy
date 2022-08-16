import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { format, parseISO } from 'date-fns';
import { BrowserRouter } from 'react-router-dom';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '../../test-utils';

import {
  PostsResponse,
  ProjectsResponse,
  SingleProjectResponse,
} from '../../mock/MockedData';
import Posts from './index';
import server from '../../mock/server';

import API from '../../API';

const setup = (): any => {
  render(
    <BrowserRouter>
      <Posts />
    </BrowserRouter>,
  );
};

it('render Posts', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();
  PostsResponse.forEach((post) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.description)).toBeInTheDocument();
    expect(
      screen.getByText(format(parseISO(post.date), "yyyy-MM-dd' 'HH:mm")),
    ).toBeInTheDocument();
  });
});
it('render with no Posts', async () => {
  server.use(
    rest.get(`${API}/posts`, (req, res, ctx) =>
      res(ctx.delay(2000), ctx.json([])),
    ),
  );
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();
  expect(screen.queryByText('No posts yet')).toBeInTheDocument();
});

it('Delete Post', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();
  const post = screen.getByText(PostsResponse[0].title);
  expect(post).toBeInTheDocument();

  const deleteButton = screen.getByTestId(
    `delete-post-${PostsResponse[0]._id}`,
  );

  userEvent.click(deleteButton);

  expect(post).not.toBeInTheDocument();
  await waitFor(() => screen.getByText(/Post Deleted Successfully/), {
    timeout: 2100,
  });
});

it('Post Field Validation', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();

  userEvent.click(screen.getByText('Create New Entry'));

  expect(screen.getByText('New Log')).toBeInTheDocument();

  userEvent.click(screen.getByText('Create Log'));

  expect(screen.getByText(/must be between 4 and 30 characters/));
  expect(screen.getByText(/must be between 10 and 400 characters/));
  expect(screen.getByText(/Project is Required/));
  expect(screen.getByText(/RoadMap is Required/));
});

it('Add New Post', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();

  userEvent.click(screen.getByText('Create New Entry'));

  expect(screen.getByText('New Log')).toBeInTheDocument();
  userEvent.type(screen.getByLabelText('Title'), 'New Title');
  userEvent.type(screen.getByLabelText('Description'), 'New Description');

  const ProjectSelect = screen.getByLabelText('Project');

  userEvent.selectOptions(ProjectSelect, [`${ProjectsResponse[0]._id}`]);
  await waitFor(() => {
    screen.getByText('Select RoadMap');
  });
  // await waitForElementToBeRemoved(screen.queryByText('Loading RoadMap'));
  const RoadMapSelect = screen.getByLabelText('RoadMap');

  userEvent.selectOptions(RoadMapSelect, [
    `${SingleProjectResponse.roadMap[0]._id},${SingleProjectResponse.roadMap[0].color}`,
  ]);

  const ProcessSelect = screen.getByLabelText('status');
  userEvent.selectOptions(ProcessSelect, ['Started']);

  userEvent.click(screen.getByText('Create Log'));

  await waitForElementToBeRemoved(screen.queryByText(/Create Log/));

  await waitFor(() => screen.findByText(/New post added successfully/), {
    timeout: 2100,
  });
});

it('Update Post', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();
  const UpdateButton = screen.getAllByText('Update Post');
  userEvent.click(UpdateButton[0]);
  expect(screen.getByText('Update New Log')).toBeInTheDocument();

  await waitForElementToBeRemoved(screen.queryByText('Loading RoadMap'));

  userEvent.type(screen.getByLabelText('Title'), 'New Title');
  userEvent.type(screen.getByLabelText('Description'), 'New Description');
  const RoadMapSelect = screen.getByLabelText('RoadMap');

  userEvent.selectOptions(RoadMapSelect, [
    `${SingleProjectResponse.roadMap[0]._id},${SingleProjectResponse.roadMap[0].color}`,
  ]);
  userEvent.click(screen.getByText('Update New Log'));
});
