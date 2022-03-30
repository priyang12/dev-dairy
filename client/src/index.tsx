import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './Styles/Global.css';
import worker from './mock/browser';
import { createStoreWithMiddleware } from './store';

const Store = createStoreWithMiddleware();

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
