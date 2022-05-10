import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged, FirebaseAuth } from './FirebaseConfig';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/login';
import Register from './pages/register';
import Feeds from './pages/feeds';
import Post from './pages/Post';
import PrivateOutlet from './components/PrivateRoute';
import { LOGOUT, USER_LOADED } from './actions/types';

// import { LOGOUT } from "./actions/types";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (userAuth) => {
      if (userAuth) {
        sessionStorage.setItem('user', JSON.stringify(userAuth));
        dispatch({ type: USER_LOADED, payload: userAuth });
      } else {
        dispatch({ type: LOGOUT });
      }
    });
  });

  useEffect(() => {
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
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/feeds" element={<Feeds />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/Post/:id" element={<Post />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
