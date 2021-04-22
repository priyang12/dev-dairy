import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/AuthAction";
import PropTypes from "prop-types";

const Register = ({ Auth: { loading, error, isAuth }, register }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = user;
  const [valid, setValid] = useState(false);

  const onchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const validName = () => {
    if (name === "" || name.length < 5) {
      return true;
    } else {
      return false;
    }
  };
  const validateEmail = () => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      return true;
    }
    return false;
  };
  const validatePassword = () => {
    return false;
  };
  const ConfirmPassword = () => {
    if (password !== password2) {
      return true;
    }
    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail() && !ConfirmPassword() && !validName()) {
      console.log(user);
      register({
        name,
        email,
        password,
      });
    } else {
      setValid(true);
    }
  };
  if (isAuth) {
    return <Redirect to="/createProfile" />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Register</h1>
          <p className="text-center lead">
            Sign up for your DevConnector account
          </p>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder=" Enter Your Name"
                name="name"
                value={name}
                onChange={onchange}
              />
            </div>
            {validName() && name !== "" ? (
              <small className="form-text mb-2" style={{ color: "red" }}>
                *Please Enter Valid Name More than 6 Characters
              </small>
            ) : null}
            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder=" Enter email"
                name="email"
                value={email}
                onChange={onchange}
              />
            </div>
            {validateEmail() && email !== "" ? (
              <small className="form-text mb-2" style={{ color: "red" }}>
                *Please Enter Valid Email
              </small>
            ) : (
              <small id="emailHelp" className="form-text mb-2 text-muted">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email.
              </small>
            )}
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder=" Enter Password"
                name="password"
                value={password}
                onChange={onchange}
              />
            </div>
            {validatePassword() && password !== "" ? (
              <small className="form-text mb-2" style={{ color: "red" }}>
                *Please Enter Valid Email
              </small>
            ) : (
              <small id="emailHelp" className="form-text mb-2 text-muted">
                Keep a Strong Password With numbers
              </small>
            )}
            <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder=" Confirm  Password"
                name="password2"
                value={password2}
                onChange={onchange}
              />
            </div>
            {ConfirmPassword() && password2 !== "" ? (
              <small className="form-text mb-2" style={{ color: "red" }}>
                *Password does not match
              </small>
            ) : null}
            {valid ? (
              <small className="form-text mb-2" style={{ color: "red" }}>
                Please Enter All the Required Fields
              </small>
            ) : null}
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-5"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
Register.propTypes = {
  // Auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, { register })(Register);
