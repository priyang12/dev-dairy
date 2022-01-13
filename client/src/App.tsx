import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";

//redux
import { Provider } from "react-redux";
import Store from "./store";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import { LOGOUT } from "./actions/types";
import home from "./pages/home";
const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
    }
    window.addEventListener("storage", () => {
      if (!localStorage.token) Store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={Store}>
      <Router>
        <Navbar />
        <Fragment>
          <Switch>
            <Route exact path='/' component={home} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
