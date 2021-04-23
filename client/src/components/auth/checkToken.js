import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loadUser } from "../../actions/AuthAction";
import PropTypes from "prop-types";
import Spinner from "../layouts/spinner";

const CheckToken = ({ Auth: { isAuth }, match }) => {
  useEffect(() => {
    localStorage.setItem("token", match.params.id);
    loadUser();
  }, [match]);
  if (isAuth) return <Redirect to="/resetpassword" />;

  return <Spinner />;
};
CheckToken.propTypes = {
  Auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, { loadUser })(CheckToken);
