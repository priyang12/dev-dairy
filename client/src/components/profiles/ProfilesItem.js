import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import arrayBufferToBase64 from "../../utils/bufferToimg";

const ProfilesItem = ({ profile }) => {
  const [avatar, setavatar] = useState(null);
  const {
    company,
    handle,
    location,
    skills,
    user,
    githubusername,
    status,
  } = profile;
  useEffect(() => {
    if (user) {
      const avatar = arrayBufferToBase64(user.avatar.data.data);
      setavatar(avatar);
    }
  }, [user]);
  return (
    <Fragment>
      <div
        className="card card-body bg-light mb-3 ml-4 p-5 mw-100"
        style={{ width: "80%" }}
      >
        <div className="row">
          <div className="col-md-5">
            <img className="rounded-circle w-75" src={avatar} alt="" />
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
