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
import Posts from './pages/Posts';
import PrivateOutlet from './components/PrivateRoute';
import Spinner from './components/spinner';
import Projects from './pages/Projects';
import SingleProject from './pages/SingleProject';
import { usePrefetch } from './API/ProjectAPI';
import NewProject from './pages/NewProject';
import EditProject from './pages/EditProject';

const LandingData = {
  heading: 'Dev Dairy',
  subheading: 'Mange your projects and share your knowledge with the world',
};

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const { isLoading } = useGetUserQuery(cookies.token);
  const getProjects = usePrefetch('GetProjects');

  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.token) {
      dispatch(setToken(cookies.token));
      getProjects('');
    }
    return () => {
      // dispatch({ type: LOGOUT });
    };
  }, [cookies.token, dispatch, getProjects]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              subheading={LandingData.subheading}
              heading={LandingData.heading}
            />
          }
        />
        <Route path="/Auth/login" element={<Login />} />
        <Route path="/Auth/Register" element={<Register />} />
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/feeds" element={<Posts />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/Projects" element={<Projects />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/Projects/:id" element={<SingleProject />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/EditProject/:id" element={<EditProject />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/NewProject" element={<NewProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
