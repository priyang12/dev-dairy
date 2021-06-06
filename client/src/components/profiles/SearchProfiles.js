import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { GetProfiles } from "../../actions/ProfileAction";
import ProfilesItem from "./ProfilesItem";
import PropTypes from "prop-types";
import Spinner from "../layouts/spinner";
const SearchProfiles = ({
  GetProfiles,
  Auth: { loading, isAuth },
  Profile: { profiles },
}) => {
  useEffect(() => {
    if (isAuth && !profiles) {
      GetProfiles();
    }
  }, [GetProfiles, isAuth, profiles]);

  return (
    <Fragment>
      {loading || !isAuth ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center ">
                <span className="text-primary">Developer</span> Profiles
              </h1>
              <p className="lead text-center">
                <i className="fab fa-connectdevelop mr-2"> </i>
                <span className="text-primary">Browse</span> and{" "}
                <span className="text-primary">connect</span> with developers
              </p>

              {profiles &&
                profiles.map((profile) => (
                  <ProfilesItem key={profile._id} profile={profile} />
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

SearchProfiles.propTypes = {
  Auth: PropTypes.object.isRequired,
  Profile: PropTypes.object.isRequired,
  GetProfiles: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Profile: state.Profile,
});
export default connect(mapStateToProps, { GetProfiles })(SearchProfiles);
