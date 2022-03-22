import { Fragment, useEffect } from "react";
import { FirebaseAuth } from "./FirebaseConfig";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import Feeds from "./pages/feeds";

// import { LOGOUT } from "./actions/types";

const App = () => {
  FirebaseAuth.onIdTokenChanged((user) => {
    if (user) {
      user.getIdToken(true).then(function (idToken) {
        localStorage.setItem("AccessToken", idToken);
      });
    } else {
      localStorage.removeItem("AccessToken");
    }
  });
  useEffect(() => {
    console.log("logged in");
    if (FirebaseAuth.currentUser)
      localStorage.setItem("user", JSON.stringify(FirebaseAuth.currentUser));
  }, []);

  return (
    <Router>
      <Navbar />
      <Fragment>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/Auth/login' component={Login} />
          <Route exact path='/feeds' component={Feeds} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
