import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { AuthState } from '../actions/interfaces';

function PrivateOutlet() {
  const { isAuth }: AuthState = useSelector((state: any) => state.Auth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateOutlet;
