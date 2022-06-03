import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createStoreWithMiddleware } from './store';
import worker from './mock/browser';
import './Styles/Global.css';
import App from './App';

const Store = createStoreWithMiddleware();

worker.start();

const config = {
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
