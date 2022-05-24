import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStoreWithMiddleware } from '../../store';

// Component: Feeds
import Feeds from '../feeds';

const store = createStoreWithMiddleware();
// Test: Feeds
it('Feeds Form', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Feeds />
      </BrowserRouter>
    </Provider>,
  );
  // Test: Feeds CRUD
});
