import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import CreateTest from './CreateTest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const setUp = () =>
  render(
    <BrowserRouter>
      <CreateTest />
    </BrowserRouter>,
  );

it('should render without crashing', async () => {
  setUp();
  await userEvent.click(screen.getByText('Make Test Data'));
  await waitFor(() => screen.getByText('Successfully'));
  await waitFor(() => expect(window.location.pathname).toMatch('posts'));
});

it('Redirect to Register Page on Close', async () => {
  setUp();
  await userEvent.click(screen.getByTestId('CloseModal'));
  expect(window.location.pathname).toMatch('register');
});
