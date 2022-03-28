import { Store } from 'redux';
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { createStoreWithMiddleware, RootState } from '../store';

type ReduxRenderOptions = {
  preloadedState?: RootState;
  store?: Store;
  renderOptions?: Omit<RenderOptions, 'wrapper'>;
};

function render(
  ui: ReactElement,
  {
    preloadedState = {},
    store = createStoreWithMiddleware(preloadedState),
    ...renderOptions
  }: ReduxRenderOptions = {},
): RenderResult {
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
