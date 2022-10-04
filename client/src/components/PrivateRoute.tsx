import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import FallBackSuspenseWrapper from './FallBackSuspenseWrapper';
import type { AuthState } from '../interface';

// Lazy load  components
const MusicPlayer = lazy(async () => import('./MusicPlayer'));
const CustomToaster = lazy(async () => import('./CustomToaster'));
const YoutubePlayer = lazy(async () => import('./YoutubePlayer'));
const SessionWidget = lazy(async () => import('./SessionWidget'));

function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <FallBackSuspenseWrapper fallback={false}>
        <CustomToaster />
      </FallBackSuspenseWrapper>
      <FallBackSuspenseWrapper fallback={false}>
        <MusicPlayer />
      </FallBackSuspenseWrapper>
      <FallBackSuspenseWrapper fallback={false}>
        <SessionWidget />
      </FallBackSuspenseWrapper>
      {children}
      <FallBackSuspenseWrapper fallback={false}>
        <YoutubePlayer />
      </FallBackSuspenseWrapper>
    </>
  );
}

function PrivateOutlet() {
  const Auth: AuthState = useSelector((state: any) => state.Auth);

  return Auth.authenticated ? (
    <AuthContainer>
      <Outlet />
    </AuthContainer>
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateOutlet;
