import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AddLike, RemoveLike, DeletePost } from "../../actions/PostAction";
import PropTypes from "prop-types";
// import post from "./post";

const FeedsItems = ({
  post: { text, likes, _id, name, avatar, user },
  AddLike,
  RemoveLike,
  DeletePost,
  user_id,
}) => {
  const [checkDelete, setDelete] = useState(false);
  const [checkLike, setLike] = useState(false);
  const [length, setlength] = useState(0);
  useEffect(() => {
    if (likes.length > 0) {
      setlength(likes.length);
      likes.map((like) => {
        if (like.user === user_id) {
          setLike(true);
        }
        return true;
      });
    }
  }, [setLike, user_id, likes]);

  const addLike = () => {
    AddLike(_id);
  };
  const removeLike = () => {
    RemoveLike(_id);
  };
  const deletePost = () => {
    DeletePost(_id);
    setDelete(true);

    // window.location.reload();
  };
  const check = () => {
    if (checkLike) {
      removeLike();
      setlength(length - 1);
    }
    if (!checkLike) {
      addLike();
      setlength(length + 1);
    }
    setLike(!checkLike);
  };
  return (
    <Fragment>
      {checkDelete ? null : (
        <div className="posts">
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-1 mw-100">
                <Link to={`/profile/${user}`}>
                  <img
                    className="rounded-circle d-none d-md-block"
                    src={avatar}
                    alt=""
                  />
                  <p className="text-center" style={{ color: "black" }}>
                    {name}
                  </p>
                </Link>
              </div>
              <div className="col-md-10">
                <p className="lead">{text}</p>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={check}
                >
                  <span className="badge badge-light">
                    {checkLike ? (
                      <div>
                        <i className="text-info fas fa-thumbs-up"></i> {length}
                      </div>
                    ) : (
                      <div>
                        <i className="text-secondary fas fa-thumbs-up"></i>{" "}
                        {length}
                      </div>
                    )}
                  </span>
                </button>

                <Link to={`/post/${_id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
              </div>
              {user_id === user && (
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "none",
                    }}
                  ></button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <div>
                      <div className="ml-2">
                        <div>
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={deletePost}
                          >
                            <span
                              className="hide-sm tex"
                              style={{ color: "#343a40" }}
                            >
                              Delete the Post
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

FeedsItems.propTypes = {
  post: PropTypes.object.isRequired,
  AddLike: PropTypes.func.isRequired,
  RemoveLike: PropTypes.func.isRequired,
  DeletePost: PropTypes.func.isRequired,
};

export default connect(null, { AddLike, RemoveLike, DeletePost })(FeedsItems);
