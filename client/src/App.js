import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/navbar";
import Home from "./components/pages/home";
import Login from "./components/auth/login";
import Register from"./components/auth/register";
import EditProfile from "./components/profile/EditProfile";
import CreateProfile from "./components/profile/CreateProfile";
import Profile from "./components/profile/Profile";
import SearchProfile from "./components/profiles/SearchProfiles";
import Feeds from "./components/posts/feeds";
import Post from "./components/posts/post";
import NotFound from "./components/layouts/NotFound";
import PrivateRoute from "./components/Routing/PrivateRoute";
import { LOGOUT } from "./actions/types"; 
//redux
import { Provider } from "react-redux";
import Store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/AuthAction";
import "./App.css";
const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      Store.dispatch(loadUser());
    } else {
      Store.dispatch({ type: LOGOUT });
    }

    // window.addEventListener("storage", () => {
    //   if (!localStorage.token) Store.dispatch({ type: LOGOUT });
    // });
  }, []);
  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/editProfile" component={EditProfile} />
            <PrivateRoute
              exact
              path="/searchProfile"
              component={SearchProfile}
            />
            <PrivateRoute
              exact
              path="/createProfile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/feeds" component={Feeds} />
            <PrivateRoute exact path="/post/:id" component={Post} />
            <PrivateRoute
              exact
              path="/createProfile"
              component={CreateProfile}
            />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
