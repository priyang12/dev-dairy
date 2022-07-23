import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import API from '../../API';
import server from '../../mock/server';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../test-utils';

import Login from './index';

const setup = (): any => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
    // { preloadedState: { Auth: AuthStateMock } },
  );
  return {
    email: screen.getByLabelText(/Email/),
    password: screen.getByLabelText(/Password/),
    submit: screen.getByRole('button', { name: 'Log In' }),
  };
};
it('Render Login Page', () => {
  const { email, password, submit } = setup();
  expect(screen.getByText(/Log in/)).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

it('Invalided input', () => {
  const { email, password, submit } = setup();
  userEvent.type(email, 'test');
  userEvent.type(password, 'test');
  userEvent.click(submit);
  screen.getByText(/Please enter a valid email/);
});

it('Valid input', async () => {
  const { email, password, submit } = setup();
  userEvent.type(email, 'patel@gmail.com');
  userEvent.type(password, '123456');
  userEvent.click(submit);
  expect(screen.getByText(/Just a moment/)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/Just a moment/));
});

it('Error message', async () => {
  const { email, password, submit } = setup();
  server.use(
    rest.post(`${API}/login`, (req, res, ctx) => res(
      ctx.status(401),
      ctx.json({ message: 'Invalid credentials' }),
    )),
  );

  userEvent.type(email, 'patel@gmail.com');
  userEvent.type(password, '123456');
  userEvent.click(submit);
  await waitForElementToBeRemoved(() => screen.getByText(/Just a moment/));
  expect(screen.getByText(/Invalid credentials/)).toBeInTheDocument();
});
