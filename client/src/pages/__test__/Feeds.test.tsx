/* eslint-disable no-underscore-dangle */
import React from 'react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import faker from '@faker-js/faker';
import { BrowserRouter } from 'react-router-dom';
import { render, waitForElementToBeRemoved, screen } from '../../test-utils';
import server from '../../mock/server';
import Feeds from '../feeds';

// Mocked Data for testing
import MockedPosts from '../../mock/MockPost';
import type { AuthState, Post } from '../../actions/interfaces';

const AuthStateMock: AuthState = {
  user: {
    uid: '5f3f8f8f8f8f8f8f8f8f8f8',
    displayName: 'Test User',
    email: faker.internet.email()
  },
  isAuth: true,
  token: faker.datatype.uuid()
};
const NewPost: Post = {
  _id: faker.datatype.uuid(),
  title: 'New Post',
  text: 'New Post Text',
  user: {
    _id: AuthStateMock.user.uid,
    avatar: faker.image.avatar(),
    displayName: AuthStateMock.user.displayName
  },
  comments: [
    {
      _id: faker.datatype.uuid(),
      text: 'New Comment',
      user: AuthStateMock.user
    },
    {
      _id: faker.datatype.uuid(),
      text: 'New Comment',
      user: faker.datatype.uuid()
    }
  ],
  likes: [
    {
      // eslint-disable-next-line no-underscore-dangle
      user: AuthStateMock.user._id
    },
    {
      user: faker.datatype.uuid()
    },
    {
      user: faker.datatype.uuid()
    },
    {
      user: faker.datatype.uuid()
    }
  ],
  createdAt: new Date().toDateString()
};

it('render Posts', async () => {
  render(
    <BrowserRouter>
      <Feeds />
    </BrowserRouter>,
    { preloadedState: { Auth: AuthStateMock } }
  );
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  // compare the data
  MockedPosts.forEach((post) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.text)).toBeInTheDocument();
  });
});

// Like Post and check if the post is liked
it('like Comment Counts Liking and Removing Liking', async () => {
  server.resetHandlers();
  server.use(
    rest.get('/api/post', (req, res, ctx) =>
      res(ctx.json([NewPost, ...MockedPosts]))
    ),
    rest.put('/api/post/like/:id', (req, res, ctx) =>
      res(ctx.json({ message: 'Post Liked', result: true }))
    ),
    rest.put('/api/post/unlike/:id', (req, res, ctx) =>
      res(ctx.json({ message: 'Post Like Removed', result: true }))
    )
  );
  render(
    <BrowserRouter>
      <Feeds />
    </BrowserRouter>,
    { preloadedState: { Auth: AuthStateMock } }
  );
  // Check Like on Load
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  const LikeBtn = screen.getByTestId(NewPost._id);
  expect(LikeBtn.textContent).toMatch(NewPost.likes.length.toString());
  // click on dislike
  userEvent.click(LikeBtn);
  // check if the post is removed from liked
  expect(LikeBtn.textContent).toMatch(JSON.stringify(NewPost.likes.length - 1));
  userEvent.click(LikeBtn);
  // check if the post is  liked
  expect(LikeBtn.textContent).toMatch(NewPost.likes.length.toString());

  // Check Comment Counts
  const CommentCount = screen.getByTestId(`${NewPost._id}-comment-count`);
  expect(CommentCount.textContent).toMatch(NewPost.comments.length.toString());
});

// Delete Post
it('delete post', async () => {
  server.resetHandlers();
  server.use(
    rest.get('/api/post', (req, res, ctx) =>
      res(ctx.json([NewPost, ...MockedPosts]))
    ),
    rest.delete('/api/post/:id', (req, res, ctx) =>
      res(ctx.json({ message: 'Post Deleted' }))
    )
  );
  render(
    <BrowserRouter>
      <Feeds />
    </BrowserRouter>,
    { preloadedState: { Auth: AuthStateMock } }
  );

  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  // Check if the post is there
  expect(screen.getByText(NewPost.title)).toBeInTheDocument();
  expect(screen.getByText(NewPost.text)).toBeInTheDocument();
  // Click on the delete button

  userEvent.click(screen.getByText(/Delete/i));

  // Check if the post is deleted+
  expect(screen.queryByText(NewPost.title)).not.toBeInTheDocument();
  expect(screen.queryByText(NewPost.text)).not.toBeInTheDocument();
  // check delete alert
  // expect(screen.getByText(/deleted/)).toBeInTheDocument();
});

// Error Handling Posts
it('Error Handling For Posts', async () => {
  server.resetHandlers();
  server.use(
    rest.get('/api/post', (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }))
    )
  );
  render(
    <BrowserRouter>
      <Feeds />
    </BrowserRouter>,
    { preloadedState: { Auth: AuthStateMock } }
  );
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  expect(screen.getByText(/Internal Server Error/i)).toBeInTheDocument();
});

// // Error Handling
// it('Error Handling For Like and Deleting Post', async () => {
//   server.resetHandlers();
//   server.use(
//     rest.get('/api/post', (req, res, ctx) => {
//       return res(ctx.json([NewPost, ...MockedPosts]));
//     }),
//     rest.delete('/api/post/:id', (req, res, ctx) =>
//       res(ctx.status(500), ctx.json({ message: `Post is not Deleted` })),
//     ),
//     rest.put('/api/post/like/:id', (req, res, ctx) => {
//       return res(ctx.json({ message: `Post is not Liked` }));
//     }),
//     // rest.put('/api/post/like/:id', (req, res, ctx) =>
//     //   res(
//     //     ctx.status(500),
//     //     ctx.json({ message: 'Something Went Wrong While Liking' }),
//     //   ),
//     // ),
//     rest.put('/api/post/unlike/:id', (req, res, ctx) =>
//       res(
//         ctx.status(500),
//         ctx.json({ message: 'Something Went Wrong While DisLiking' }),
//       ),
//     ),
//   );
//   render(
//     <BrowserRouter>
//       <Feeds />
//     </BrowserRouter>,
//     { preloadedState: { Auth: AuthStateMock } },
//   );
//   await waitForElementToBeRemoved(screen.getByAltText('loading...'));
//   const LikeBtn = screen.getByTestId(NewPost._id);
//   expect(LikeBtn.textContent).toMatch(NewPost.likes.length.toString());
//   // click on dislike
//   userEvent.click(LikeBtn);

//   // Check for Dislike Error
//   // expect(
//   //   screen.getByText(/Something Went Wrong While DisLiking/i),
//   // ).toBeInTheDocument();
//   // userEvent.click(LikeBtn);
//   // check if the post is  liked
//   // expect(
//   //   screen.getByText(/Something Went Wrong While Liking/i),
//   // ).toBeInTheDocument();
// });
