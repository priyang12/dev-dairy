import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { logout, setToken } from './features/AuthSlice';
import { useGetUserQuery } from './API/UserAPI';
import { usePrefetch } from './API/ProjectAPI';
// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/login';
import Register from './pages/register';
// Components
import PrivateOutlet from './components/PrivateRoute';
import CustomToaster from './components/CustomToaster';
import Spinner from './components/spinner';
import type { StoreState } from './store';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: StoreState) => state.Auth);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const { isLoading } = useGetUserQuery(cookies.token, {
    skip: !cookies.token,
  });
  const getProjects = usePrefetch('GetProjects');

  useEffect(() => {
    if (cookies.token) {
      dispatch(setToken(cookies.token));
    }
    return () => {
      dispatch(logout());
    };
  }, [cookies.token, dispatch]);

  useEffect(() => {
    if (token) {
      getProjects('');
    }
  }, [token, getProjects]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <CustomToaster />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<PrivateOutlet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
