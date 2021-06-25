import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DeleteComment } from "../../actions/PostAction";

const CommnetsItems = ({
  DeleteComment,
  auth,
  postId,
  comment: { date, text, user, _id },
}) => {
  return (
    <Fragment>
      <div className="comments p-3 m-3">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-md-2 mw-100">
              <Link to={`/profile/${user._id}`}>
                <img src={user.avatar} alt="sd" width="100" />
                <p style={{ color: "black", marginBottom: "0rem" }}>
                  {user.name.toUpperCase()}
                </p>
              </Link>
            </div>

            <div className="col-md-12">
              <p className="lead">{text}</p>
              <p className="post-date">Posted on {date.slice(0, 10)}</p>
              {!auth.loading && user._id === auth.user._id && (
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

CommnetsItems.propTypes = {
  auth: PropTypes.object.isRequired,
  DeleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.Auth,
});

export default connect(mapStateToProps, { DeleteComment })(CommnetsItems);
