import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileItems from "./ProfileItems";
import AddExp from "./AddExperience";
import AddEducation from "./AddEducation";
import CropImage from "./cropimage";
import Spinner from "../layouts/spinner";
import { loadProfile, AddProfile } from "../../actions/ProfileAction";

const init = {
  handle: "",
  company: "",
  website: "",
  location: "",
  bio: "",
  status: "",
  githubusername: "",
  skills: "",
  youtube: "",
  twitter: "",
  facebook: "",
  linkedin: "",
};
const EditProfile = ({
  loadProfile,
  Auth: { user, loading, isAuth },
  Profile: { profile },
  AddProfile,
}) => {
  const [Profile, setprofile] = useState(init);
  const [display, toggleDisplay] = useState(false);
  useEffect(() => {
    if (!profile) loadProfile(user._id);
    if (profile && !loading) {
      const profileData = { ...init };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(", ");
      setprofile(profileData);
    }
  }, [profile, loadProfile, user._id, loading]);

  const {
    handle,
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    twitter,
    youtube,
    facebook,
    linkedin,
  } = Profile;

  const [valid, setValid] = useState(false);

  const onchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setprofile({ ...Profile, [name]: value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    if (status === "" || skills === "") {
      setValid(true);
    } else {
      AddProfile(Profile);
      window.location.reload();
    }
  };
  // if (user && profile.handle === "") {
  //   loadProfile(user._id);
  // }
  return (
    <Fragment>
      {isAuth && profile ? (
        <>
          <AddExp />
          <AddEducation />
          <div className="create-profile">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Edit Your Profile</h1>
                  {valid}

                  <small className="d-block pb-3" style={{ color: "red" }}>
                    * = required field
                  </small>
                  <CropImage />
                  <div className="profilepic">
                    <img
                      src={localStorage.avatar}
                      alt="error"
                      className="rounded-circle m-2"
                    />

                    <div className="picture ">
                      <a
                        href="#CropImageModal"
                        data-toggle="modal"
                        data-target="#CropImageModal"
                      >
                        <i className="fas fa-edit"></i>
                      </a>
                    </div>
                  </div>
                  <form onSubmit={onsubmit}>
                    <div className="form-group ">
                      <div className="form-control form-control-lg .text-muted">
                        {handle}
                      </div>
                      <small className="form-text text-muted">
                        can not chnage the handle once made
                      </small>
                    </div>
                    <div className="form-group ">
                      <div className="form-control form-control-lg .text-muted">
                        {status}
                      </div>
                      <small className="form-text text-muted"></small>
                    </div>
                    <div className="form-group">
                      <select
                        className="form-control form-control-lg"
                        name="status"
                        onChange={onchange}
                      >
                        <option defaultValue="0">
                          * Select Professional Status
                        </option>
                        <option defaultValue="Developer">Developer</option>
                        <option defaultValue="Junior Developer">
                          Junior Developer
                        </option>
                        <option defaultValue="Senior Developer">
                          Senior Developer
                        </option>
                        <option defaultValue="Manager">Manager</option>
                        <option defaultValue="Student or Learning">
                          Student or Learning
                        </option>
                        <option defaultValue="Instructor">
                          Instructor or Teacher
                        </option>
                        <option defaultValue="Intern">Intern</option>
                        <option defaultValue="Other">Other</option>
                      </select>
                      <small className="form-text text-muted">
                        Give us an idea of where you are at in your career
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Company"
                        name="company"
                        value={company}
                        onChange={onchange}
                      />
                      <small className="form-text text-muted">
                        Could be your own company or one you work for
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Website"
                        name="website"
                        value={website}
                        onChange={onchange}
                      />
                      <small className="form-text text-muted">
                        Could be your own or a company website
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={onchange}
                      />
                      <small className="form-text text-muted">
                        City and state suggested (eg. Boston, MA)
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="*Skills"
                        name="skills"
                        value={skills}
                        onChange={onchange}
                      />
                      <small className="form-text text-muted">
                        Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)
                      </small>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Github Username"
                        name="githubusername"
                        value={githubusername}
                        onChange={onchange}
                      />
                      <small className="form-text text-muted">
                        If you want your latest repos and a Github link, include
                        your username
                      </small>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control form-control-lg"
                        placeholder="A short bio of yourself"
                        name="bio"
                        defaultValue={bio}
                        onChange={onchange}
                      ></textarea>
                      <small className="form-text text-muted">
                        Tell us a little about yourself
                      </small>
                    </div>

                    <div className="mb-3">
                      <button
                        onClick={() => toggleDisplay(!display)}
                        type="button"
                        className="btn btn-light"
                      >
                        <div className="p-4">
                          Add Social Network Links ||{" "}
                          <span className="text-muted">Optional</span>
                        </div>
                      </button>
                    </div>
                    {display && (
                      <Fragment>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-twitter"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Twitter Profile URL"
                            name="twitter"
                            value={twitter}
                            onChange={onchange}
                          />
                        </div>

                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-facebook"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Facebook Page URL"
                            name="facebook"
                            value={facebook}
                            onChange={onchange}
                          />
                        </div>

                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-linkedin"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Linkedin Profile URL"
                            name="linkedin"
                            value={linkedin}
                            onChange={onchange}
                          />
                        </div>

                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-youtube"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="YouTube Channel URL"
                            name="youtube"
                            value={youtube}
                            onChange={onchange}
                          />
                        </div>
                      </Fragment>
                    )}
                    <button
                      type="button"
                      className="btn btn-light"
                      data-toggle="modal"
                      data-target="#experienceModal"
                    >
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
                      Add Experience
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      data-toggle="modal"
                      data-target="#educationModal"
                    >
                      <i className="fa fa-user-graduate" aria-hidden="true"></i>{" "}
                      Add Education
                    </button>
                    <div className="mt-2">
                      <h4 className="mb-4">Experience Credentials</h4>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                          </tr>
                        </thead>
                        <thead>
                          {profile.experience !== null
                            ? profile.experience.map((field) => (
                                <ProfileItems key={field._id} field={field} />
                              ))
                            : null}
                        </thead>
                      </table>
                    </div>
                    <div className="mt-2">
                      <h4 className="mb-4">Education Credentials</h4>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th></th>
                          </tr>
                        </thead>
                        <thead>
                          {profile.education !== null
                            ? profile.education.map((field) => (
                                <ProfileItems key={field._id} field={field} />
                              ))
                            : null}
                        </thead>
                      </table>
                    </div>

                    <input type="submit" className="btn btn-info p-2 m-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

EditProfile.propTypes = {
  Auth: PropTypes.object.isRequired,
  loadProfile: PropTypes.func.isRequired,
  AddProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
  Profile: state.Profile,
});
export default connect(mapStateToProps, { loadProfile, AddProfile })(
  EditProfile
);
