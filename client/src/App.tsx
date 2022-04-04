import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/login';
import Register from './pages/register';

import { FirebaseAuth } from './FirebaseConfig';
import Feeds from './pages/feeds';
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
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Auth/login" element={<Login />} />
        <Route path="/Auth/Register" element={<Register />} />
        <Route path="/feeds" element={<Feeds />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
