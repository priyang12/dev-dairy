import React, { Fragment, useEffect, useState } from "react";
import CommentItems from "./commnetsItems";
import Spinner from "../layouts/spinner";
import { connect } from "react-redux";
import arrayBufferToBase64 from "../../utils/bufferToimg";
import { GetPost, PostComment } from "../../actions/PostAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Post = ({ GetPost, PostComment, match, Post: { post, loading } }) => {
  const [avatar, setavatar] = useState(null);
  useEffect(() => {
    GetPost(match.params.id);
  }, [GetPost, match.params.id]);
  if (avatar === null) {
    if (post !== null) {
      const avatar = arrayBufferToBase64(post.user.avatar.data.data);
      setavatar(avatar);
    }
  }
  const [text, settext] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    PostComment({ text }, post._id);
    settext("");
  };

  return (
    <Fragment>
      {post !== null && !loading ? (
        <div className="post">
          <div className="container">
            <div className="row m-2">
              <div className="col-sm-12">
                <div className="card card-body mb-3">
                  <div className="row ">
                    <div className="col-1 mw-100">
                      <img
                        className="rounded-circle d-none d-md-block  "
                        src={avatar}
                        alt="error"
                        width="150"
                      />
                      <Link to={`/profile/${post.user._id}`}>
                        <p
                          className="text-center"
                          style={{ color: "black", marginBottom: "0rem" }}
                        >
                          {post.name}
                        </p>
                      </Link>
                    </div>
                    {/* <div className="col-md-1"></div> */}
                    <div className=" col-md-9 ">
                      <p className="lead">{post.text}</p>
                    </div>
                  </div>
                </div>

                <div className="post-form mb-3">
                  <div className="card card-info">
                    <div className="card-header bg-info text-white">
                      Comment
                    </div>
                    <div className="card-body">
                      <form onSubmit={onsubmit}>
                        <div className="form-group">
                          <textarea
                            className="form-control form-control-lg"
                            placeholder="Make a comment"
                            value={text}
                            onChange={(e) => settext(e.target.value)}
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {post.comments.map((comment) => (
                  <CommentItems
                    key={comment._id}
                    comment={comment}
                    postId={post._id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

Post.propTypes = {
  Post: PropTypes.object.isRequired,
  GetPost: PropTypes.func.isRequired,
  PostComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Post: state.Post,
});

export default connect(mapStateToProps, { GetPost, PostComment })(Post);
