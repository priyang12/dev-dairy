import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducers from './reducers';

const middleware = [thunk];

export const createStoreWithMiddleware = (initialState = {}): Store =>
  createStore(
    RootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
const store = createStoreWithMiddleware();
export type RootState = ReturnType<typeof store.getState>;
// const store: Store = createStore(
//   RootReducers,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware)),
// );

// set up a store subscription listener
// to store the users token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error
// let currentState = store.getState();

// store.subscribe(() => {
//   // keep track of the previous and current state to compare changes
//   let previousState = currentState;
//   currentState = store.getState();

//   // if the token changes set the value in localStorage and axios headers
//   // if (previousState.auth.token !== currentState.auth.token) {
//   //   const token = currentState.auth.token;
//   //   setAuthToken(token);
//   // }
// });
