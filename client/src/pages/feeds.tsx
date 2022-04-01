import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostContainer from '../components/PostContainer';
import Spinner from '../components/spinner';
import { getPostsAction } from '../actions/PostAction';
import type { AlertState, Post } from '../actions/interfaces';

function Feeds() {
  const { loading } = useSelector((state: any) => state.Alert);
  const { posts } = useSelector((state: any) => state.Post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <>
      {/* <Send /> */}
      <div className="feed">
        <div className="container">
          <div className="mx-5 px-5 ">
            <div className="card-header bg-info text-white">
              <a href="#SendModal" data-toggle="modal" data-target="#SendModal">
                Say Something...
              </a>
            </div>
          </div>
          <div className="col p-3">
            {posts?.map((post: Post) => (
              // eslint-disable-next-line no-underscore-dangle
              <PostContainer key={post._id} post={post} />
            ))}
          </div>
        </div>
      </div>
      )
    </>
  );
}

export default Feeds;
