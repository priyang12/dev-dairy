import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import Settings from './Settings';
import { BrowserRouter } from 'react-router-dom';

const SetUp = () =>
  render(
    <BrowserRouter>
      <Settings />
    </BrowserRouter>,
  );
it('should render without crashing', () => {
  SetUp();
  screen.getAllByText('Settings');
  screen.getByText('Profile');
  screen.getByText('Preference');
});
