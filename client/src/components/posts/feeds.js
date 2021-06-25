import React, { Fragment, useEffect } from "react";
import FeedItem from "./feedsItems";
import Send from "./send";
import { connect } from "react-redux";
import Spinner from "../layouts/spinner";
import { GetPosts } from "../../actions/PostAction";
import PropTypes from "prop-types";

const Feeds = ({
  Auth: { isAuth, loading, user },
  GetPosts,
  Post: { posts },
}) => {
  useEffect(() => {
    GetPosts();
  }, [GetPosts]);

  return (
    <Fragment>
      {isAuth && !loading ? (
        <>
          <Send />
          <div className="feed">
            <div className="container">
              <div className="mx-5 px-5 ">
                <div className="card-header bg-info text-white">
                  <a
                    href="#SendModal"
                    data-toggle="modal"
                    data-target="#SendModal"
                  >
                    {" "}
                    Say Somthing...
                  </a>
                </div>
              </div>
              <div className="col p-3">
                {posts !== null && user !== null
                  ? posts.map((post) => (
                      <FeedItem key={post._id} post={post} user_id={user._id} />
                    ))
                  : null}
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

Feeds.propTypes = {
  Post: PropTypes.object.isRequired,
  Auth: PropTypes.object.isRequired,
  GetPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Post: state.Post,
  Auth: state.Auth,
});

export default connect(mapStateToProps, { GetPosts })(Feeds);
