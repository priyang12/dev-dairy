import { Fragment } from "react";
import { FirebaseAuth } from "./Firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";

// import { LOGOUT } from "./actions/types";

const App = () => {
  if (FirebaseAuth.currentUser) {
    FirebaseAuth.currentUser.getIdToken(true).then(function (idToken) {
      localStorage.setItem("AccessToken", idToken);
    });
    localStorage.setItem("user", JSON.stringify(FirebaseAuth.currentUser));
  }
  return (
    <Router>
      <Navbar />
      <Fragment>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/Auth/login' component={Login} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
