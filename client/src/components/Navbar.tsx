import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/AuthAction';
import type { AuthState } from '../actions/interfaces';

function Navbar() {
  const { isAuth, user }: AuthState = useSelector((state: any) => state.Auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    localStorage.clear();
    sessionStorage.removeItem('user');
    dispatch(logout());
  };

  const AuthLinks = (
    <div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ color: 'white' }}
        >
          Hello
          {' '}
          {user?.displayName ? user.displayName : 'Stranger'}
        </button>
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          style={{ backgroundColor: '#343a40' }}
        >
          <div>
            {user && (
            <li className="ml-2">
              <Link to={`/profile/${user.uid}`}>
                <span className="hide-sm">Profile</span>
              </Link>
            </li>
              )}
            <li className="ml-2">
              <Link to="/editProfile">
                <span className="hide-sm">Edit Profile</span>
              </Link>
            </li>

            <div className="dropdown-divider" />
            <li className="ml-3">
              <Link onClick={onLogout} to="/Auth/login">
                <i className="fas fa-sign-out-alt" />
                {' '}
                <span className="hide-sm">Logout</span>
              </Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
  const UnAuthLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/Auth/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Auth/register">
          Register
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark  mb-4">
      <div className="container">
        <Link to={`/${user ? 'feeds' : ''}`} className=".navbar-brand">
          <h2>Dev Hub</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-3">
            <li className="nav-item">
              <Link className="nav-link" to="/searchProfile">
                Developers
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {!isAuth ? UnAuthLinks : AuthLinks}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
