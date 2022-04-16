import { useLayoutEffect } from 'react';
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

  useLayoutEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  if (posts.length === 0) return <p>No posts</p>;
  if (loading) return <Spinner />;

  return (
    <div className="top">
      <MarginContainer>
        {alert}
        <Grid gridTemplateColumns={['2']} gap={20}>
          {posts.length > 0 &&
            posts?.map((post: Post) => (
              // eslint-disable-next-line no-underscore-dangle
              <PostContainer key={post._id} post={post} />
            ))}
        </Grid>
      </MarginContainer>
    </div>
  );
}

export default Feeds;
