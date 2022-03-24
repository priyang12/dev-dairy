import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/login';
import Register from './pages/Register';

import { FirebaseAuth } from './FirebaseConfig';
// import { LOGOUT } from "./actions/types";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    if (FirebaseAuth.currentUser) {
      // Store Current User in session storage
      sessionStorage.setItem('user', JSON.stringify(FirebaseAuth.currentUser));
    }

    FirebaseAuth.onIdTokenChanged((user) => {
      if (user) {
        user.getIdToken(true).then((idToken) => {
          setCookie('token', idToken, { path: '/Auth' });
        });
      } else {
        removeCookie('token', { path: '/Auth' });
      }
    });
  }, [setCookie, removeCookie]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/Auth/login" component={Login} />
        <Route exact path="/Auth/Register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
