import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
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
import MailToken from './pages/MailToken';
import ChangePassword from './pages/ChangePassword';
import ErrorBoundaryUI from './components/ErrorBoundaryUI';
import CreateTest from './pages/CreateTest';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const { isLoading } = useGetUserQuery(undefined, {
    skip: !cookies.token,
  });
  const getProjects = usePrefetch('GetProjects');

  useEffect(() => {
    if (cookies.token) {
      getProjects('');
    }
  }, [cookies.token]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <CustomToaster />
      <ErrorBoundaryUI>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<MailToken />} />
          <Route path="/ChangePassword/:id" element={<ChangePassword />} />
          <Route path="/CreateTest" element={<CreateTest />} />
          <Route path="*" element={<PrivateOutlet />} />
        </Routes>
      </ErrorBoundaryUI>
    </BrowserRouter>
  );
}

export default App;
