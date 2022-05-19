import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { setToken } from './features/AuthSlice';
import { useGetUserQuery } from './API/UserAPI';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/login';
import Register from './pages/register';
import Feeds from './pages/feeds';
import PrivateOutlet from './components/PrivateRoute';
import Spinner from './components/spinner';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const { isLoading } = useGetUserQuery(cookies.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.token) {
      dispatch(setToken(cookies.token));
    }
    return () => {
      // dispatch({ type: LOGOUT });
    };
  }, [cookies.token, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
