import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadProfile } from "../../actions/ProfileAction";
import arrayBufferToBase64 from "../../utils/bufferToimg";
import PropTypes from "prop-types";
import Spinner from "../layouts/spinner";
const Profile = ({ match, loadProfile, Profile: { loading, profile } }) => {
  const [avatar, setavatar] = useState(null);
  useEffect(() => {
    loadProfile(match.params.id);
    if (profile) {
      const avatar = arrayBufferToBase64(profile.user.avatar.data.data);
      setavatar(avatar);
    }
  }, [match.params.id, profile]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        profile !== null && (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-body bg-secondary  text-white mb-3">
                      <div className="row">
                        <div className=" m-auto">
                          <img
                            className="rounded-circle"
                            src={avatar}
                            alt="Error"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <h1 className="display-4 text-center">
                          {profile.handle}
                        </h1>
                        {profile.company ? (
                          <p className="lead text-center">
                            {profile.status} at {profile.company}
                          </p>
                        ) : (
                          <p>{profile.status}</p>
                        )}
                        <p>{profile.location}</p>

                        <div className="icons m-2">
                          {/* <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-globe fa-2x"></i>
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-twitter fa-2x"></i>
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-facebook fa-2x"></i>
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-linkedin fa-2x"></i>
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-youtube fa-2x"></i>
                      </a>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram fa-2x"></i>
                      </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-body bg-light mb-3">
                      <h3 className="text-center text-info">
                        {profile.handle}'s Bio
                      </h3>
                      <p className="lead">{profile.bio}</p>
                      <hr />
                      <h3 className="text-center text-info">Skill Set</h3>
                      <div className="row justify-content-center ">
                        <div className="d-flex flex-wrap  ">
                          {profile.skills ? (
                            <Fragment>
                              {profile.skills.map((skill, index) => (
                                <div className="p-3" key={index}>
                                  <i className="fa fa-check mr-2"></i>
                                  {skill}
                                </div>
                              ))}
                            </Fragment>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    <ul className="list-group">
                      {profile.experience.length > 0 ? (
                        <Fragment>
                          {profile.experience.map((expi, index) => (
                            <li className="list-group-item" key={index}>
                              <h4>{expi.company}</h4>
                              {!expi.current ? (
                                <p>
                                  {expi.from.slice(0, 10)}-|-
                                  {expi.to.slice(0, 10)}
                                </p>
                              ) : (
                                <p>
                                  {expi.from.slice(0, 10)} -|- Joined and
                                  Currnetly working
                                </p>
                              )}
                              <p>
                                <strong>Position:</strong> {expi.title}
                              </p>
                              <p>
                                <strong>Description:</strong> {expi.descrition}
                              </p>
                            </li>
                          ))}
                        </Fragment>
                      ) : null}
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    <ul className="list-group">
                      {profile.education.length > 0 ? (
                        <Fragment>
                          {profile.education.map((edu, index) => (
                            <li className="list-group-item" key={index}>
                              <h4>Institute : {edu.school}</h4>
                              {!edu.current ? (
                                <p>
                                  {edu.from.slice(0, 10)}-|-
                                  {edu.to.slice(0, 10)}
                                </p>
                              ) : (
                                <p>
                                  {edu.from.slice(0, 10)} -|- Joined and
                                  Currnetly Studying
                                </p>
                              )}

                              <p>
                                <strong>Degree:</strong> {edu.degree}
                              </p>
                              <p>
                                <strong>Field Of Study:</strong>{" "}
                                {edu.fieldOfStudy}
                              </p>
                            </li>
                          ))}
                        </Fragment>
                      ) : null}
                    </ul>
                  </div>
                </div>

                {/* <div ref="myRef">
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            <div key={repo.id} className="card card-body mb-2">
              <div className="row">
                <div className="col-md-6">
                  <h4>
                    <Link
                      to={repo.html_url}
                      className="text-info"
                      target="_blank"
                    >
                      {" "}
                      Repository One
                    </Link>
                  </h4>
                  <p>Repository description</p>
                </div>
                <div className="col-md-6">
                  <span className="badge badge-info mr-1">Stars: 44</span>
                  <span className="badge badge-secondary mr-1">Watchers: 21</span>
                  <span className="badge badge-success">Forks: 122</span>
                </div>
              </div>
            </div>
          </div> */}
              </div>
            </div>
          </div>
        )
      )}
    </Fragment>
  );
};
Profile.propTypes = {
  Profile: PropTypes.object.isRequired,
  loadProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Profile: state.Profile,
});
export default connect(mapStateToProps, { loadProfile })(Profile);
