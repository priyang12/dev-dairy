import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { store as Store, Persister } from './store';
import { ThemeColors, space, config } from './Theme';
import '@priyang/react-component-lib/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/Global.css';
import App from './App';
import ErrorBoundaryUI from './components/ErrorBoundaryUI';
import { serviceWorkerRegister } from './serviceWokerRegister';

if (import.meta.env.DEV) {
  (async () => {
    const { default: worker } = await import('./mock/browser');
    worker.start();
  })();
}

const theme = extendTheme({
  config,
  colors: ThemeColors,
  space,
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ErrorBoundaryUI>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persister}>
          <ChakraProvider theme={theme}>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundaryUI>
  </React.StrictMode>,
);
serviceWorkerRegister();
