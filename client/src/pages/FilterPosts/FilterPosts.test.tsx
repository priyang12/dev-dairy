import { render, screen, waitForElementToBeRemoved } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import FilterPosts from './FilterPosts';
import { BrowserRouter } from 'react-router-dom';
import { PostsResponse } from '../../mock/MockedData';
import { format, parseISO } from 'date-fns';

const setup = (): any => {
  render(
    <BrowserRouter>
      <FilterPosts />
    </BrowserRouter>,
  );
};

it('render Posts', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.queryByAltText('loading...'), {
    timeout: 2100,
  });
  expect(screen.getByText('Filter Log')).toBeInTheDocument();
  PostsResponse.forEach((post) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.description)).toBeInTheDocument();
    expect(
      screen.getByText(format(parseISO(post.date), "yyyy-MM-dd' 'HH:mm")),
    ).toBeInTheDocument();
  });
});
