import { Fragment, useEffect } from "react";
import { FirebaseAuth } from "./FirebaseConfig";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import Feeds from "./pages/feeds";
import { useCookies } from "react-cookie";

// import { LOGOUT } from "./actions/types";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  console.log(FirebaseAuth);
  useEffect(() => {
    if (FirebaseAuth.currentUser)
      localStorage.setItem("user", JSON.stringify(FirebaseAuth.currentUser));
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
  console.log(cookies.token);
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
