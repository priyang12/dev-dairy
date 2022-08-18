import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import Settings from './Settings';
import { BrowserRouter } from 'react-router-dom';

const SetUp = () => {
  return render(
    <BrowserRouter>
      <Settings />
    </BrowserRouter>,
  );
};
it('should render without crashing', () => {
  SetUp();
  screen.getByText('Settings');
  screen.getByText('Profile');
  screen.getByText('Preferences');
});
