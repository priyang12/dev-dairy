import { AuthErrorMessages } from '@dev-dairy/zodvalidation';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import API from '../../API';
import server from '../../mock/server';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';

import Register from './index';

const setup = (): any => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>,
  );
  return {
    name: screen.getByLabelText(/Username/),
    email: screen.getByLabelText(/Email/),
    password: screen.getByLabelText('Password'),
    password2: screen.getByLabelText(/ConfirmPassword/),
    submit: screen.getByRole('button', { name: 'Register Now' }),
  };
};
it('Render Register Page', () => {
  const { name, email, password, password2, submit } = setup();
  expect(screen.getByText(/Register Page/)).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(password2).toBeInTheDocument();
  expect(submit).toBeInTheDocument();
});

it('Invalided input', async () => {
  const { email, password, name, password2, submit } = setup();
  await userEvent.type(name, 'pr');
  await userEvent.type(email, 'test');
  await userEvent.type(password, 'test');
  await userEvent.type(password2, 'test2');
  await userEvent.click(submit);
  expect(screen.getByText(AuthErrorMessages.username)).toBeInTheDocument();
  expect(screen.getByText(AuthErrorMessages.email)).toBeInTheDocument();
  expect(screen.getByText(AuthErrorMessages.password)).toBeInTheDocument();
  expect(screen.getByText(AuthErrorMessages.password2)).toBeInTheDocument();
});

it('Valid input', async () => {
  const { email, password, name, password2, submit } = setup();
  await userEvent.type(name, 'priyang');
  await userEvent.type(email, 'test@gmail.com');
  await userEvent.type(password, 'test123');
  await userEvent.type(password2, 'test123');
  await userEvent.click(submit);
  expect(screen.getByText(/Just a moment/)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/Just a moment/));
});

it('Error message', async () => {
  const { email, password, name, password2, submit } = setup();
  server.use(
    rest.post(`${API}/register`, (req, res, ctx) =>
      res(
        ctx.status(501),
        ctx.json({ message: 'Server Error Please try again later' }),
      ),
    ),
  );

  await userEvent.type(name, 'priyang');
  await userEvent.type(email, 'test@gmail.com');
  await userEvent.type(password, 'test123');
  await userEvent.type(password2, 'test123');
  await userEvent.click(submit);
  await waitForElementToBeRemoved(() => screen.getByText(/Just a moment/));
  expect(
    screen.getByText(/Server Error Please try again later/),
  ).toBeInTheDocument();
});
