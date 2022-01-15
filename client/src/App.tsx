import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from "./actions/AuthAction";
import Navbar from "./components/Navbar";
import home from "./pages/home";
import Login from "./pages/login";
import setAuthToken from "./utils/setAuthToken";
// import { LOGOUT } from "./actions/types";

const App = () => {
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
