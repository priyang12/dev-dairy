import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../mock/server';
import Feeds from '../Feeds';
import { Provider } from 'react-redux';
import store from '../../store';

it('render Posts', async () => {
  render(
    <Provider store={store}>
      <Feeds />
    </Provider>,
  );
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  screen.debug();
});
