import React, { Fragment, useEffect, useState } from "react";
import CommentItems from "./commnetsItems";
import Spinner from "../layouts/spinner";
import { connect } from "react-redux";
import { GetPost, PostComment } from "../../actions/PostAction";
import PropTypes from "prop-types";

const Post = ({ GetPost, PostComment, match, Post: { post, loading } }) => {
  useEffect(() => {
    GetPost(match.params.id);
  }, [GetPost, match.params.id]);
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
            <div className="row m-5">
              <div className="col">
                <div className="card card-body mb-3">
                  <div className="row ">
                    <div className="col-1 mw-100">
                      <a href="profile.html">
                        <img
                          className="rounded-circle d-none d-md-block"
                          src={post.avatar}
                          alt=""
                        />
                      </a>
                      <br />
                      <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-3"></div>
                    <div className="col-5">
                      <a href="profile.html">
                        <img
                          className="rounded-circle d-none d-md-block"
                          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-5"></div>
                    <div className="m-2 row">
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
