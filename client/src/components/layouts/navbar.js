import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/AuthAction";
import { clearProfile } from "../../actions/ProfileAction";
import PropTypes from "prop-types";

const Navbar = ({ Auth: { isAuth, user }, logout, clearProfile }) => {
  const onLogout = () => {
    logout();
    clearProfile();
    window.location.reload();
  };

  const authLinks = (
    <Fragment>
      <div>
        {" "}
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ color: "white" }}
          >
            Hello {user && user.name}
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ backgroundColor: "#343a40" }}
          >
            <div>
              {user && (
                <li className="ml-2">
                  <Link to={`/profile/${user._id}`}>
                    <span className="hide-sm">Profile</span>
                  </Link>
                </li>
              )}
              <li className="ml-2">
                <Link to="/editProfile">
                  <span className="hide-sm">Edit Profile</span>
                </Link>
              </li>

              <div className="dropdown-divider"></div>
              <li className="ml-3">
                <Link onClick={onLogout} to="/login">
                  <i className="fas fa-sign-out-alt" />{" "}
                  <span className="hide-sm">Logout</span>
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
  const reglink = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        {" "}
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark  mb-4">
      <div className="container">
        <Link to="/feeds" className=".navbar-brand">
          <h2>Dev Conntector</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-3">
            <li className="nav-item">
              <Link className="nav-link" to="/searchProfile">
                {" "}
                Developers
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {!isAuth ? reglink : authLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  Auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, { logout, clearProfile })(Navbar);
