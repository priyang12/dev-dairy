import React, { Fragment } from "react";
import { connect } from "react-redux";
// import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { DeleteComment } from "../../actions/PostAction";

const commnetsItems = ({
  DeleteComment,
  auth,
  postId,
  comment: { name, avatar, date, text, user, _id },
}) => {
  return (
    <Fragment>
      <div className="comments p-3 m-3">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2 mw-100">
              <a href="profile.html">
                <img
                  className="rounded-circle d-none d-md-block"
                  src={avatar}
                  alt=""
                />
              </a>
              <br />

              <p className="text-center ">{name}</p>
            </div>

            <div className="col-md-10">
              <p className="lead">{text}</p>
              <p className="post-date">Posted on {date.slice(0, 10)}</p>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => DeleteComment(postId, _id)}
                  type="button"
                  className="btn btn-danger px-5"
                >
                  <i className="fas fa-times" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

commnetsItems.propTypes = {
  auth: PropTypes.object.isRequired,
  DeleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default connect(mapStateToProps, { DeleteComment })(commnetsItems);
