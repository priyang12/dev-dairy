import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { AuthState } from '../interface';
import AuthRoutes from '../AuthRoutes';

function PrivateOutlet() {
  const Auth: AuthState = useSelector((state: any) => state.Auth);
  console.log(Auth);

  return Auth.authenticated ? <AuthRoutes /> : <Navigate to="/" />;
}

export default PrivateOutlet;
