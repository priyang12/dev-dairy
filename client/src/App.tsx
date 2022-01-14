import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import home from "./pages/home";
import Login from "./pages/login";
import setAuthToken from "./utils/setAuthToken";
// import { LOGOUT } from "./actions/types";

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.AccessToken) {
      setAuthToken(localStorage.AccessToken);
    }
  }, []);
  return (
    <Router>
      <Navbar />
      <Fragment>
        <Switch>
          <Route exact path='/' component={home} />
          <Route exact path='/Auth/login' component={Login} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
