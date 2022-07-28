import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { logout, setToken } from './features/AuthSlice';
import { useGetUserQuery } from './API/UserAPI';
import { usePrefetch } from './API/ProjectAPI';
// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/login';
import Register from './pages/register';
import Posts from './pages/Posts';
import Projects from './pages/Projects';
import RoadMap from './pages/RoadMap';
import NewProject from './pages/NewProject';
import EditProject from './pages/EditProject';
import SingleProject from './pages/SingleProject';
import WorkSessions from './pages/WorkSessions';

// Components
import PrivateOutlet from './components/PrivateRoute';
import Spinner from './components/spinner';
import MusicPlaylist from './pages/MusicPlaylist';
import Navbar from './components/Navbar';
import FallBackSuspenseWrapper from './components/FallBackSuspenseWrapper';
import ProjectSessions from './pages/ProjectSessions';
import SessionWidget from './components/SessionWidget';

// Lazy load  components
const MusicPlayer = lazy(async () => import('./components/MusicPlayer'));

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const { isLoading } = useGetUserQuery(cookies.token, {
    skip: !cookies.token,
  });
  const getProjects = usePrefetch('GetProjects');

  useEffect(() => {
    if (cookies.token) {
      dispatch(setToken(cookies.token));
      getProjects('');
    }
    return () => {
      dispatch(logout());
    };
  }, [cookies.token, dispatch, getProjects]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <FallBackSuspenseWrapper fallback={false}>
        <MusicPlayer />
      </FallBackSuspenseWrapper>
      <SessionWidget />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
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
          <Route
            path="/EditProject/:id"
            element={
              <FallBackSuspenseWrapper>
                <EditProject />
              </FallBackSuspenseWrapper>
            }
          />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/RoadMap/:id" element={<RoadMap />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/Sessions" element={<WorkSessions />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/Project/Sessions/:id" element={<ProjectSessions />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/NewProject" element={<NewProject />} />
        </Route>
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="/MusicPlaylist" element={<MusicPlaylist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
