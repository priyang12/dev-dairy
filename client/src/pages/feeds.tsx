import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, GridItem } from '@chakra-ui/react';
import type { AlertState, Post } from '../actions/interfaces';
import { getPostsAction } from '../actions/PostAction';
import PostContainer from '../components/PostContainer';
import Spinner from '../components/spinner';

function Feeds() {
  const { loading, alert }: AlertState = useSelector(
    (state: any) => state.Alert
  );
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
        {alert}
        <div className="container">
          <div className="mx-5 px-5 ">
            <div className="card-header bg-info text-white">
              <a href="#SendModal" data-toggle="modal" data-target="#SendModal">
                Say Something...
              </a>
            </div>
          </div>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {posts?.map((post: Post) => (
              // eslint-disable-next-line no-underscore-dangle
              <GridItem key={post._id}>
                <PostContainer post={post} />
              </GridItem>
            ))}
          </Grid>
        </div>
      </div>
      )
    </>
  );
}

export default Feeds;
