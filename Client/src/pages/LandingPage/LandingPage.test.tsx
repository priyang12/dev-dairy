import { BrowserRouter } from 'react-router-dom';
import { screen, render } from '../../test-utils';
import LandingPage from './index';

it('render The Landing Text', () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>,
  );

  expect(
    screen.getByText(
      'Mange your projects and share your knowledge with the world',
    ),
  ).toBeInTheDocument();
});
