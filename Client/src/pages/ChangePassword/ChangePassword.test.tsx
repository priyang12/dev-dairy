import { render } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import ChangePassword from './ChangePassword';
import { BrowserRouter } from 'react-router-dom';

it('should render without crashing', () => {
  render(
    <BrowserRouter>
      <ChangePassword />
    </BrowserRouter>,
  );
});
