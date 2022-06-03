import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';

import SingleProject from './index';

const setup = (): any => {
  render(
    <BrowserRouter>
      <SingleProject />
    </BrowserRouter>,
  );
};

it('render Single Project', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
});
