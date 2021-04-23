import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/AuthAction";
import Spinner from "../layouts/spinner";
import PropTypes from "prop-types";

const Login = ({ Auth: { error, isAuth }, login }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const [valid, setValid] = useState(false);

  const validateEmail = (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase()) || email === "") {
      return true;
    }
    return false;
  };

  const onchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email) && password !== "") {
      login(user);
    } else {
      setValid(true);
    }
  };
  if (isAuth) {
    return <Redirect to="/feeds" />;
  }

  return (
    <Fragment>
      {!isAuth ? (
        <>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log in</h1>
              <p className="text-center lead">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder=" Enter email"
                    name="email"
                    value={email}
                    onChange={onchange}
                  />
                  {validateEmail(email) && email !== "" ? (
                    <small className="form-text" style={{ color: "red" }}>
                      Please Enter Valid Email Address
                    </small>
                  ) : (
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder=" Enter Password"
                    name="password"
                    value={password}
                    onChange={onchange}
                  />
                </div>
                {error ? (
                  <small className="form-text" style={{ color: "red" }}>
                    {" "}
                    {error}
                  </small>
                ) : null}

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Submit"
                />
                {valid && (
                  <small className="form-text" style={{ color: "red" }}>
                    Please Enter Fields corrtctly
                  </small>
                )}
              </form>
              <p className="my-1 ">
                <Link to="resetpassword" className="black-text">
                  Forgot Password ?
                </Link>
              </p>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

Login.propTypes = {
  Auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, { login })(Login);
