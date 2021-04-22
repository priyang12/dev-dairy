import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ProfilesItem = ({ profile }) => {
  const {
    company,
    handle,
    location,
    skills,
    user,
    githubusername,
    status,
  } = profile;

  return (
    <Fragment>
      <div
        className="card card-body bg-light mb-3 p-5 mw-100"
        style={{ width: "80%" }}
      >
        <div className="row">
          <div className="col-3">
            <img className="rounded-circle" src={user.avatar} alt="" />
          </div>
          <div className="col">
            <h3>{handle}</h3>
            <span>{status}</span>
            {company && <span> at {company}</span>}
            {location && <p>{location}</p>}
            {githubusername && <p>Github Username{githubusername}</p>}
            <div className="mt-3">
              <Link className="btn btn-info" to={`/profile/${user._id}`}>
                View Profile
              </Link>
            </div>
          </div>
          <div className="col d-none d-lg-block">
            <h4>Skill Set</h4>
            {skills ? (
              skills.map((skill, index) => (
                <div className="mt-2" key={index}>
                  <i className="fa fa-check pr-1"></i>
                  {skill}
                </div>
              ))
            ) : (
              <div>None Skill Set</div>
            )}
            {/* <div className="mt-2">
              <i className="fa fa-check pr-1"></i>HTML
            </div>
            <div>
              <i className="fa fa-check pr-1"></i>HTML
            </div>
            <div>
              <i className="fa fa-check pr-1"></i>HTML
            </div>
            <div>
              <i className="fa fa-check pr-1"></i>HTML
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilesItem;
