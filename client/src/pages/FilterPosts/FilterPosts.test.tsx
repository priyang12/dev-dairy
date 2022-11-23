import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import { Route, Router, Routes } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { PostsResponse, ProjectsResponse } from '../../mock/MockedData';
import FilterPosts from './FilterPosts';

const route = `/Posts/filter?project=${ProjectsResponse[0]._id}`;
const History = createMemoryHistory({ initialEntries: [route] });

const setup = (History: any, route: any) => {
  render(
    <Router navigator={History} location={route}>
      <Routes>
        <Route path="/Posts/filter" element={<FilterPosts />} />
      </Routes>
    </Router>,
  );
};

it('Put Filter', async () => {
  setup(History, route);

  await waitFor(() => {
    expect(screen.getByAltText(/loading.../)).toBeInTheDocument();
  });
  await waitForElementToBeRemoved(screen.getByAltText(/loading.../));

  expect(screen.getByText('Filter Log')).toBeInTheDocument();

  const FilterPosts = PostsResponse.filter(
    (post) => post.project._id === ProjectsResponse[0]._id,
  );

  FilterPosts.forEach((post) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.description)).toBeInTheDocument();
    expect(
      screen.getByText(format(parseISO(post.date), "yyyy-MM-dd' 'HH:mm")),
    ).toBeInTheDocument();
  });
});

it('Put Filter', async () => {
  const FilteredRoute = `/Posts/filter?project=${ProjectsResponse[1]._id}&status=Done`;
  const NewHistory = createMemoryHistory({ initialEntries: [route] });
  setup(NewHistory, FilteredRoute);

  await waitFor(() => {
    expect(screen.getByAltText(/loading.../)).toBeInTheDocument();
  });
  await waitForElementToBeRemoved(screen.getByAltText(/loading.../));

  expect(screen.getByText('Filter Log')).toBeInTheDocument();

  const FilterPosts = PostsResponse.filter(
    (post) =>
      post.project._id === ProjectsResponse[1]._id && post.status === 'Done',
  );

  FilterPosts.forEach((post) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.description)).toBeInTheDocument();
    expect(
      screen.getByText(format(parseISO(post.date), "yyyy-MM-dd' 'HH:mm")),
    ).toBeInTheDocument();
  });
});

it('Test Filter Menu', async () => {
  const FilteredRoute = '/Posts/filter';
  const NewHistory = createMemoryHistory({ initialEntries: [route] });
  setup(NewHistory, FilteredRoute);

  await waitForElementToBeRemoved(screen.queryByText('Loading Projects'));
  const ProjectSelect = screen.getByLabelText('Project');

  await userEvent.selectOptions(ProjectSelect, [`${ProjectsResponse[0]._id}`]);

  const FilterLogs = screen.getByRole('button', { name: 'Filter Logs' });

  await userEvent.click(FilterLogs);

  expect(FilterLogs).not.toBeVisible();
  expect(screen.getByText('No Filter Applied')).toBeInTheDocument();
  expect(screen.queryByText('No posts yet')).not.toBeInTheDocument();

  // const ProcessSelect = screen.getByLabelText('status');
  // await userEvent.selectOptions(ProcessSelect, ['In-Process']);
});

it('Delete Post', async () => {
  setup(History, route);
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Filter Log')).toBeInTheDocument();

  const FilterPosts = PostsResponse.filter(
    (post) => post.project._id === ProjectsResponse[0]._id,
  );

  const post = screen.getByText(FilterPosts[0].title);
  expect(post).toBeInTheDocument();

  const deleteButton = screen.getByTestId(`delete-post-${FilterPosts[0]._id}`);

  await userEvent.click(deleteButton);

  await waitFor(() => screen.getByText(/Post Deleted Successfully/), {
    timeout: 2100,
  });
});
