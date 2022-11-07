import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store as Store, Persister } from './store';
import { ThemeColors, space, config } from './Theme';
import worker from './mock/browser';
import '@priyang/react-component-lib/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/Global.css';
import App from './App';

if (process.env.REACT_APP_ENVIRONMENT === 'test') {
  worker.start();
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
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persister}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
