import type { Store } from '@reduxjs/toolkit';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { createStoreWithMiddleware } from '../store';
import type { RootState } from '../store';
import CustomToaster from '../components/CustomToaster';

type ReduxRenderOptions = {
  preloadedState?: RootState;
  store?: Store;
  renderOptions?: Omit<RenderOptions, 'wrapper'>;
};

function render(
  ui: ReactElement,
  {
    preloadedState = {},
    store = createStoreWithMiddleware(),
    ...renderOptions
  }: ReduxRenderOptions = {},
): RenderResult {
  function Wrapper({
    children = null,
  }: {
    // eslint-disable-next-line react/require-default-props
    children?: ReactNode;
  }): ReactElement {
    return (
      <Provider store={store}>
        <HelmetProvider>
          <CustomToaster />
          {children}
        </HelmetProvider>
      </Provider>
    );
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
