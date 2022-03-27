import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostContainer from '../components/PostContainer';
import Spinner from '../components/spinner';
import { getPostsAction } from '../actions/PostAction';

function Feeds() {
  const { loading } = useSelector((state: any) => state.Alert);
  const { posts } = useSelector((state: any) => state.Post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsAction());
  }, []);
  console.log(posts);
  if (loading) return <Spinner />;

  return (
    <Fragment>
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
            {/* {posts &&
              posts.map((post: Post) => (
                <PostContainer key={post.uid} post={post} />
              ))} */}
          </div>
        </div>
      </div>
      )
    </Fragment>
  );
}

export default Feeds;
