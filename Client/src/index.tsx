import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { store as Store, Persister } from './store';
import { ThemeColors, space, config } from './Theme';
import { serviceWorkerRegister } from './serviceWokerRegister';
import ErrorBoundaryUI from './components/ErrorBoundaryUI';
import App from './App';

import '@priyang/react-component-lib/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/Global.css';

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
