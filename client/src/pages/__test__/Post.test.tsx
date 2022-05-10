import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import faker from '@faker-js/faker';
import { BrowserRouter } from 'react-router-dom';
import { render, waitForElementToBeRemoved, screen } from '../../test-utils';
import server from '../../mock/server';
import Post from '../Post';

// Mocked Data for testing
import MockedPosts from '../../mock/MockPost';
import type { AuthState } from '../../actions/interfaces';

const AuthStateMock: AuthState = {
  user: {
    uid: '5f3f8f8f8f8f8f8f8f8f8f8',
    displayName: 'Test User',
    email: faker.internet.email(),
  },
  isAuth: true,
  token: faker.datatype.uuid(),
};

// render Post
it('render Posts', async () => {
  render(
    <BrowserRouter>
      <Post />
    </BrowserRouter>,

    { preloadedState: { Auth: AuthStateMock } },
  );
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  // compare the data
  expect(screen.getByText(MockedPosts[0].title)).toBeInTheDocument();
  expect(screen.getByText(MockedPosts[0].text)).toBeInTheDocument();
  expect(screen.getByText(MockedPosts[0].user.displayName)).toBeInTheDocument();
});

it('render Post with comments', async () => {
  render(
    <BrowserRouter>
      <Post />
    </BrowserRouter>,

    { preloadedState: { Auth: AuthStateMock } },
  );
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  // compare the data
  expect(screen.getByText(MockedPosts[0].comments[0].text)).toBeInTheDocument();
  expect(screen.getByText(MockedPosts[0].comments[1].text)).toBeInTheDocument();
});
