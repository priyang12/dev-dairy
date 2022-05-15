import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStoreWithMiddleware } from '../../store';

// Component: login
import Login from '../login';

const store = createStoreWithMiddleware();
// Test: login
it('Login Form', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>,
  );
  // Test: login form
  const email = screen.getByText('Email');
  const password = screen.getByText('Password');
  const submitBtn = screen.getByText('Log In');
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();

  // Test: login form fields
  userEvent.type(email, 'PatelPriyang95@gmail.com');
  userEvent.type(password, '12345678');

  // Test: login form submit
  userEvent.click(submitBtn);
});
