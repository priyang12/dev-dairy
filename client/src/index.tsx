import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { createStoreWithMiddleware } from './store';
import worker from './mock/browser';
import * as serviceWorker from './serviceWorker';
import './Styles/Global.css';
import App from './App';

const Store = createStoreWithMiddleware();

if (process.env.NODE_ENV === 'development') {
  worker.start({ onUnhandledRequest: 'bypass' });
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
