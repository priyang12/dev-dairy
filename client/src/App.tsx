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
import Posts from './pages/Posts';
import Projects from './pages/Projects';
import RoadMap from './pages/RoadMap';
import NewProject from './pages/NewProject';
import EditProject from './pages/EditProject';
import SingleProject from './pages/SingleProject';
import WorkSessions from './pages/WorkSessions';
import MusicPlaylist from './pages/MusicPlaylist';
import ProjectSessions from './pages/ProjectSessions';
import FilterPosts from './pages/FilterPosts';
import Settings from './pages/Settings';
import PreferenceSettings from './pages/PreferenceSettings';
import ProfileSettings from './pages/ProfileSettings';
// Components
import PrivateOutlet from './components/PrivateRoute';
import Spinner from './components/spinner';
import type { StoreState } from './store';
import ShareProject from './pages/ShareProject';
import Share from './pages/Share';

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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="Posts" element={<Posts />} />
          <Route path="Posts/filter" element={<FilterPosts />} />
          <Route path="Projects" element={<Projects />} />
          <Route path="NewProject" element={<NewProject />} />
          <Route path="Projects/:id" element={<SingleProject />} />
          <Route path="EditProject/:id" element={<EditProject />} />
          <Route path="RoadMap/:id" element={<RoadMap />} />
          <Route path="ShareProject/:id" element={<ShareProject />} />
          <Route path="Share/:token" element={<Share />} />
          <Route path="Project/Sessions/:id" element={<ProjectSessions />} />
          <Route path="Sessions" element={<WorkSessions />} />
          <Route path="MusicPlaylist" element={<MusicPlaylist />} />
          <Route path="Settings" element={<Settings />}>
            <Route path="Preference" element={<PreferenceSettings />} />
            <Route path="Profile" element={<ProfileSettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
