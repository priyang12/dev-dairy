import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AuthRoutes from '../AuthRoutes';
import { StoreState } from '../store';

function PrivateOutlet() {
  const { authenticated } = useSelector((state: StoreState) => state.Auth);

  return authenticated ? <AuthRoutes /> : <Navigate to="/" />;
}

export default PrivateOutlet;
