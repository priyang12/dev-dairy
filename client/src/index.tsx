import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store as Store, Persister } from './store';
import worker from './mock/browser';
import '@priyang/react-component-lib/dist/react-component-lib.cjs.development.css';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/Global.css';
import App from './App';

if (process.env.REACT_APP_ENVIRONMENT === 'test') {
  worker.start();
}

const config = {
  useSystemColorMode: true,
};

const colors = {
  primary: {
    50: '#2DC0AB',
    100: '#2BB8AB',
    200: '#27A5A7',
    300: '#238997',
    400: '#206F86',
    500: '#1C5876',
    600: '#184465',
    700: '#143255',
    800: '#102344',
    900: '#0D1838',
  },
  secondary: {
    50: '#FFB7FA',
    100: '#FFA2F8',
    200: '#FF79F6',
    300: '#FF51F3',
    400: '#FF28F0',
    500: '#FE00EC',
    600: '#C600B8',
    700: '#8E0084',
    800: '#560050',
    900: '#1E001C',
  },
  third: {
    50: '#E5F6F9',
    100: '#D6F1F6',
    200: '#B9E5F0',
    300: '#9BD7E9',
    400: '#7EC8E3',
    500: '#58B3DB',
    600: '#339DD3',
    700: '#267DB1',
    800: '#1E5F8B',
    900: '#164265',
  },
  con: {
    50: '#2B4F8D',
    100: '##049CE4',
    200: '#02C9AF',
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
