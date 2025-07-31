import { delay, HttpResponse, http as rest } from 'msw';
import { format, parseISO } from 'date-fns';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { PostErrorMessages } from '@dev-dairy/zodvalidation';
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
    rest.get(`${API}/posts`, async ({ request: req }) => {
      await delay(2000);
      return HttpResponse.json([], {});
    }),
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

  expect(screen.getByText('create Log')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Create Log'));

  expect(screen.getByText(PostErrorMessages.title.short)).toBeInTheDocument();
  expect(
    screen.getByText(PostErrorMessages.description.short),
  ).toBeInTheDocument();
  expect(screen.getByText(PostErrorMessages.project)).toBeInTheDocument();
  expect(screen.getByText(PostErrorMessages.roadMap)).toBeInTheDocument();
});

it('Add New Post', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Dairy Log')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Create New Entry'));

  expect(screen.getByText('create Log')).toBeInTheDocument();
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

  const submitting = screen.getByTestId('SubmitButton');

  await userEvent.click(submitting);

  await waitForElementToBeRemoved(submitting);

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
