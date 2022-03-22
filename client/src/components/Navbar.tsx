import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadUser, logout } from "../actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import setAuthToken from "../utils/setAuthToken";
import { AuthState } from "../actions/interfaces";

const Navbar = () => {
  const { isAuth, user }: AuthState = useSelector((state: any) => state.Auth);
  if (localStorage.AccessToken) {
    setAuthToken(localStorage.AccessToken);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.AccessToken && !user) dispatch(loadUser());
  }, [user, dispatch]);

  const onLogout = () => {
    localStorage.clear();
    dispatch(logout());
    // logout(dispatch);
  };

  const AuthLinks = (
    <Fragment>
      <div>
        <div className='dropdown'>
          <button
            className='btn btn-secondary dropdown-toggle'
            type='button'
            id='dropdownMenuButton'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
            style={{ color: "white" }}
          >
            Hello {user?.displayName}
          </button>
          <div
            className='dropdown-menu'
            aria-labelledby='dropdownMenuButton'
            style={{ backgroundColor: "#343a40" }}
          >
            <div>
              {user && (
                <li className='ml-2'>
                  <Link to={`/profile/${user.uid}`}>
                    <span className='hide-sm'>Profile</span>
                  </Link>
                </li>
              )}
              <li className='ml-2'>
                <Link to='/editProfile'>
                  <span className='hide-sm'>Edit Profile</span>
                </Link>
              </li>

              <div className='dropdown-divider'></div>
              <li className='ml-3'>
                <Link onClick={onLogout} to='/Auth/login'>
                  <i className='fas fa-sign-out-alt' />{" "}
                  <span className='hide-sm'>Logout</span>
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
  const UnAuthLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='/Auth/login'>
          Login
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/Auth/register'>
          Register
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar sticky-top navbar-expand-sm navbar-dark bg-dark  mb-4'>
      <div className='container'>
        <Link to='/feeds' className='.navbar-brand'>
          <h2>Dev Hub</h2>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#mobile-nav'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='mobile-nav'>
          <ul className='navbar-nav ml-3'>
            <li className='nav-item'>
              <Link className='nav-link' to='/searchProfile'>
                Developers
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav ml-auto'>
            {!isAuth ? UnAuthLinks : AuthLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
