import { Fragment, useEffect } from "react";
import { FirebaseAuth } from "./FirebaseConfig";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import Register from "./pages/Register";
import { useCookies } from "react-cookie";

// import { LOGOUT } from "./actions/types";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if (FirebaseAuth.currentUser) {
      // Store Current User in session storage
      sessionStorage.setItem("user", JSON.stringify(FirebaseAuth.currentUser));
    }

    FirebaseAuth.onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken(true).then(function (idToken) {
          setCookie("token", idToken, { path: "/Auth" });
        });
      } else {
        removeCookie("token", { path: "/Auth" });
      }
    });
  }, [setCookie, removeCookie]);

  return (
    <Router>
      <Navbar />
      <Fragment>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/Auth/login' component={Login} />
          <Route exact path='/Auth/Register' component={Register} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
