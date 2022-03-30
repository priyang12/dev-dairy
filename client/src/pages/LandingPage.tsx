import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { AuthState } from '../actions/interfaces';

function LandingPage() {
   const { isAuth, user }: AuthState = useSelector((state: any) => state.Auth);
   if (isAuth && user) {
      return <Navigate to="/feed" />;
   }
   return (
      <div className="landing">
         <div className="dark-overlay landing-inner text-light">
            <div className="text-center">
               <h1 className="display-3">Developer Connector</h1>
               <p className="ml-3">
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
               </p>
            </div>
         </div>
      </div>
   );
}

export default LandingPage;
