import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { AuthState } from '../interface';
import Navbar from './Navbar';
import SessionWidget from './SessionWidget';
import FallBackSuspenseWrapper from './FallBackSuspenseWrapper';

// Lazy load  components
const MusicPlayer = lazy(async () => import('./MusicPlayer'));
const CustomToaster = lazy(async () => import('./CustomToaster'));

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
      <SessionWidget />
      {children}
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
