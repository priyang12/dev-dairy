import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store as Store, Persister } from './store';
import './Styles/Global.css';
import App from './App';

const config = {
  useSystemColorMode: true,
};

const colors = {
  primary: {
    '50': '#2DC0AB',
    '100': '#2BB8AB',
    '200': '#27A5A7',
    '300': '#238997',
    '400': '#206F86',
    '500': '#1C5876',
    '600': '#184465',
    '700': '#143255',
    '800': '#102344',
    '900': '#0D1838',
  },
};

const theme = extendTheme({
  config,
  colors,
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persister}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
