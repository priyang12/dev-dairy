import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { AuthState } from '../interface';

function PrivateOutlet() {
  const Auth: AuthState = useSelector((state: any) => state.Auth);
  return Auth.authenticated ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateOutlet;
