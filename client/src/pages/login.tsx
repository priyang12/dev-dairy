import React, { useState, Fragment } from "react";
import { connect, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../actions/AuthAction";
import Spinner from "../components/spinner";
import PropTypes from "prop-types";

const Login = () => {
  const { isAuth } = useSelector((state: any) => state.Auth);

  const onchange = (e: React.FormEvent<HTMLInputElement>) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  if (isAuth) {
    return <Redirect to='/feeds' />;
  }

  return (
    <Fragment>
      {!isAuth ? (
        <>
          <div className='row'>
            <div className='col-sm-4 m-auto '>
              <h1 className='display-4 text-center'>Log in</h1>
              <span className='my-1 '>
                <Link to='resetpassword' className='black-text'>
                  / Forgot Password ?
                </Link>
              </span>
              <p className='text-center lead'>
                Sign in to your DevConnector account
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
