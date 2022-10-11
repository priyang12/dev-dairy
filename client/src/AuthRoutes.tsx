import { Box } from '@chakra-ui/react';
import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import FallBackSuspenseWrapper from './components/FallBackSuspenseWrapper';
import EditProject from './pages/EditProject';
import FilterPosts from './pages/FilterPosts';
import MusicPlaylist from './pages/MusicPlaylist';
import NewProject from './pages/NewProject';
import Posts from './pages/Posts';
import PreferenceSettings from './pages/PreferenceSettings';
import ProfileSettings from './pages/ProfileSettings';
import Projects from './pages/Projects';
import ProjectSessions from './pages/ProjectSessions';
import RoadMap from './pages/RoadMap';
import Settings from './pages/Settings';
import Share from './pages/Share';
import ShareProject from './pages/ShareProject';
import SingleProject from './pages/SingleProject';
import WorkSessions from './pages/WorkSessions';

// Lazy load  components
const Navbar = lazy(() => import('./components/Navbar'));
const MusicPlayer = lazy(async () => import('./components/MusicPlayer'));
const YoutubePlayer = lazy(async () => import('./components/YoutubePlayer'));
const SessionWidget = lazy(async () => import('./components/SessionWidget'));

function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Box position="fixed" right="0" bottom="0" zIndex="10" w="100%">
        <FallBackSuspenseWrapper fallback={false}>
          <MusicPlayer />
        </FallBackSuspenseWrapper>
        <FallBackSuspenseWrapper fallback={false}>
          <SessionWidget />
        </FallBackSuspenseWrapper>
        <FallBackSuspenseWrapper fallback={false}>
          <YoutubePlayer />
        </FallBackSuspenseWrapper>
      </Box>
      {children}
    </>
  );
}

function AuthRoutes() {
  return (
    <AuthContainer>
      <Routes>
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
      </Routes>
    </AuthContainer>
  );
}

export default AuthRoutes;
