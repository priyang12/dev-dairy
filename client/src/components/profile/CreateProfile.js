import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AddProfile } from "../../actions/ProfileAction";

const CreateProfile = ({ Profile: { isProfile }, AddProfile }) => {
  const [profile, setprofile] = useState({
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
    instagram: "",
  });

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
  } = profile;
  // eslint-disable-next-line
  const [valid, notValid] = useState(false);

  const onchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setprofile({ ...profile, [name]: value });

    console.log(profile);
  };
  const onsubmit = (e) => {
    e.preventDefault();
    if (status === "" || skills === "") {
      notValid(true);
    } else {
      AddProfile(profile);
    }
  };
  if (isProfile) return <Redirect to="/feeds" />;

  return (
    <div className="container">
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-3 text-center">Create Your Profile</h1>
              <form action="add-experience.html" onSubmit={onsubmit}>
                <div className="form-group ">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="handle"
                    name="handle"
                    value={handle}
                    onChange={onchange}
                  />
                  <small className="form-text text-muted">
                    can not chnage the handle once made and has to be unique
                  </small>
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={status}
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
                    <option defaultValue="Manager">Freelancer</option>
                    <option defaultValue="Student or Learning">
                      Student or Learning
                    </option>
                    <option defaultValue="Instructor">
                      Instructor or Teacher
                    </option>
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
                    value={bio}
                    onChange={onchange}
                  >
                    I am a web developer from Florida with around 8 years
                    experience
                  </textarea>
                  <small className="form-text text-muted">
                    Tell us a little about yourself
                  </small>
                </div>

                <div className="mb-3">
                  <h3 className=" p-10">Add Social Network Links</h3>
                  <span className="text-muted">Optional</span>
                </div>

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

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateProfile.protoType = {
  AddProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Profile: state.Profile,
});
export default connect(mapStateToProps, { AddProfile })(CreateProfile);
