import type { Store } from 'redux';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStoreWithMiddleware } from '../store';
import type { RootState } from '../store';

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
  // eslint-disable-next-line react/require-default-props
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
