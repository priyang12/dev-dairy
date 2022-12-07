import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { AuthErrorMessages } from '@dev-dairy/zodvalidation';
import API from '../../API';
import server from '../../mock/server';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';
import Login from './index';

const setup = (): any => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
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

it('Invalided input', async () => {
  const { email, password, submit } = setup();
  await userEvent.type(email, 'test');
  await userEvent.type(password, 'test');
  await userEvent.click(submit);
  screen.getByText(AuthErrorMessages.email);
  screen.getByText(AuthErrorMessages.password);
});

it('Valid input', async () => {
  const { email, password, submit } = setup();
  await userEvent.type(email, 'patel@gmail.com');
  await userEvent.type(password, '123456');
  await userEvent.click(submit);
  expect(screen.getByText(/Just a moment/)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/Just a moment/));
});

it('Error message', async () => {
  const { email, password, submit } = setup();
  server.use(
    rest.post(`${API}/login`, (req, res, ctx) =>
      res(ctx.status(401), ctx.json({ message: 'Invalid credentials' })),
    ),
  );

  await userEvent.type(email, 'patel@gmail.com');
  await userEvent.type(password, '123456');
  await userEvent.click(submit);
  await waitForElementToBeRemoved(() => screen.getByText(/Just a moment/));
  expect(screen.getByText(/Invalid credentials/)).toBeInTheDocument();
});
