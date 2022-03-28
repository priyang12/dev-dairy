import React from 'react';
import { render, waitForElementToBeRemoved, screen } from '../../test-utils';
// import { rest } from 'msw';
// import { server } from '../../mock/server';
import Feeds from '../Feeds';

// Mocked Data for testing
import { MockedPosts } from '../../mock/MockPost';
import { AuthState } from '../../actions/interfaces';
import faker from '@faker-js/faker';
import { BrowserRouter } from 'react-router-dom';

const AuthStateMock: AuthState = {
  user: {
    _id: '5f3f8f8f8f8f8f8f8f8f8f8',
    displayName: 'Test User',
    email: faker.internet.email(),
  },
  isAuth: true,
  token: faker.datatype.uuid(),
};
it('render Posts', async () => {
  render(
    <BrowserRouter>
      <Feeds />
    </BrowserRouter>,
    { preloadedState: { Auth: AuthStateMock } },
  );
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  //compare the data
  MockedPosts.forEach((post) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.text)).toBeInTheDocument();
  });
});
