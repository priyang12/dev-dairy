import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { sendToken, resetPassword } from "../../actions/AuthAction";
import Spinner from "../layouts/spinner";
import PropTypes from "prop-types";

const Resetpassword = ({
  Auth: { error, isAuth, loading },
  sendToken,
  resetPassword,
}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = user;
  const [valid, setValid] = useState(false);
  const [Redirectfeeds, setRedirectfeeds] = useState(false);

  const validateEmail = (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase()) || email === "") {
      return true;
    }
    return false;
  };
  const ConfirmPassword = () => {
    if (password !== password2) {
      return true;
    }
    return false;
  };
  const onchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const submitEmail = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      sendToken({ email });
    } else {
      setValid(true);
    }
  };
  const submitPassword = (e) => {
    e.preventDefault();
    if (!ConfirmPassword()) {
      resetPassword({ password });
      setRedirectfeeds(true);
    } else {
      setValid(true);
    }
  };
  if (Redirectfeeds) return <Redirect to="/feeds" />;
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : !isAuth ? (
        <>
          <div className="row">
            <div className="col-md-4 m-auto">
              <form onSubmit={submitEmail}>
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
                  ) : null}
                </div>
                {error ? (
                  <small className="form-text mb-2" style={{ color: "red" }}>
                    {" "}
                    {error}
                  </small>
                ) : null}

                <input type="submit" className="btn btn-info " value="Submit" />
                {valid && (
                  <small className="form-text" style={{ color: "red" }}>
                    Please Enter Fields corrtctly
                  </small>
                )}
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-md-4 m-auto">
              <form onSubmit={submitPassword}>
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
                {password !== "" ? (
                  <small className="form-text mb-2" style={{ color: "red" }}>
                    *Please Enter Password
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
                <input type="submit" className="btn btn-info " value="Submit" />
                {valid && (
                  <small className="form-text" style={{ color: "red" }}>
                    Please Enter Fields corrtctly
                  </small>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

Resetpassword.propTypes = {
  Auth: PropTypes.object.isRequired,
  sendToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, { sendToken, resetPassword })(
  Resetpassword
);
