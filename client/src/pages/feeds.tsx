import React, { Fragment, useEffect } from "react";
import FeedItem from "../components/feedsItems";
import Send from "../components/posts/send";
import { useSelector, useDispatch } from "react-redux";
import { GetPosts } from "../actions/PostAction";
import Spinner from "../components/spinner";

const Feeds = () => {
  const { loading, alert } = useSelector((state: any) => state.Alert);
  const { posts } = useSelector((state: any) => state.Post);
  const dispatch = useDispatch();
  if (!posts) {
    dispatch(GetPosts());
  }

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Send />
      <div className='feed'>
        <div className='container'>
          <div className='mx-5 px-5 '>
            <div className='card-header bg-info text-white'>
              <a href='#SendModal' data-toggle='modal' data-target='#SendModal'>
                Say Something...
              </a>
            </div>
          </div>
          <div className='col p-3'>
            {posts &&
              posts.map((post: any) => <FeedItem key={post._id} post={post} />)}
          </div>
        </div>
      </div>
      )
    </Fragment>
  );
};

export default Feeds;
