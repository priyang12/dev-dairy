import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import PostContainer from '../components/PostContainer';
import Spinner from '../components/spinner';
import { getPostsAction } from '../actions/PostAction';
import type { AlertState, Post } from '../actions/interfaces';
import MarginContainer from '../components/MarginContainer';

function Feeds() {
  const { loading, alert }: AlertState = useSelector(
    (state: any) => state.Alert,
  );
  const { posts } = useSelector((state: any) => state.Post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  if (loading) return <Spinner />;

  if (alert) return <MarginContainer>{alert}</MarginContainer>;

  return (
    <div className="top">
      {/* <Send /> */}
      <MarginContainer>
        {alert}
        <Flex direction="column" gap={20}>
          {posts.length !== 0 ? (
            posts?.map((post: Post) => (
              // eslint-disable-next-line no-underscore-dangle
              <PostContainer post={post} key={post._id} />
            ))
          ) : (
            <h1>No posts yet</h1>
          )}
        </Flex>
      </MarginContainer>
    </div>
  );
}

export default Feeds;
