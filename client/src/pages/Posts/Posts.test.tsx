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
  await waitFor(() => {
    expect(screen.getByText(PostsResponse[0].title)).toBeInTheDocument();
  });
  PostsResponse.forEach((post) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.description)).toBeInTheDocument();
    expect(
      screen.getByText(format(parseISO(post.date), "yyyy-MM-dd' 'HH:mm")),
    ).toBeInTheDocument();
  });
});

it('Delete Post', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();

  await waitFor(() => {
    screen.getByText(PostsResponse[0].title);
  });
  const post = screen.getByText(PostsResponse[0].title);

  const deleteButton = screen.getByTestId(
    `delete-post-${PostsResponse[0]._id}`,
  );

  await userEvent.click(deleteButton);

  expect(post).not.toBeInTheDocument();
  await waitFor(() => screen.getByText(/Post Deleted Successfully/), {
    timeout: 2100,
  });
});

it('render with no Posts', async () => {
  server.use(
    rest.get(`${API}/posts`, (req, res, ctx) =>
      res(ctx.delay(2000), ctx.json([])),
    ),
  );
  await setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();
  expect(screen.getByText('No posts yet')).toBeInTheDocument();
});

it('Post Field Validation', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Create New Entry'));

  expect(screen.getByText('New Log')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Create Log'));

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

  await userEvent.click(screen.getByText('Create New Entry'));

  expect(screen.getByText('New Log')).toBeInTheDocument();
  await userEvent.type(screen.getByLabelText('Title'), 'New Title');
  await userEvent.type(screen.getByLabelText('Description'), 'New Description');

  const ProjectSelect = screen.getByLabelText('Project');

  await userEvent.selectOptions(ProjectSelect, [`${ProjectsResponse[0]._id}`]);
  await waitFor(() => {
    screen.getByText('Select RoadMap');
  });
  // await waitForElementToBeRemoved(screen.queryByText('Loading RoadMap'));
  const RoadMapSelect = screen.getByLabelText('RoadMap');

  await userEvent.selectOptions(RoadMapSelect, [
    `${SingleProjectResponse.roadMap[0]._id},${SingleProjectResponse.roadMap[0].color}`,
  ]);

  const ProcessSelect = screen.getByLabelText('status');
  await userEvent.selectOptions(ProcessSelect, ['Started']);

  await userEvent.click(screen.getByText('Create Log'));

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

  await waitFor(() => {
    screen.getByText(PostsResponse[0].title);
  });

  const UpdateButton = screen.getAllByText('Update Post');
  await userEvent.click(UpdateButton[0]);
  expect(screen.getByText('Update New Log')).toBeInTheDocument();

  await waitForElementToBeRemoved(screen.queryByText('Loading RoadMap'));

  await userEvent.type(screen.getByLabelText('Title'), 'New Title');
  await userEvent.type(screen.getByLabelText('Description'), 'New Description');
  const RoadMapSelect = screen.getByLabelText('RoadMap');

  await userEvent.selectOptions(RoadMapSelect, [
    `${SingleProjectResponse.roadMap[0]._id},${SingleProjectResponse.roadMap[0].color}`,
  ]);
  await userEvent.click(screen.getByText('Update New Log'));
});
