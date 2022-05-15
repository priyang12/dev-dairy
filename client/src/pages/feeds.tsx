import { useSelector } from 'react-redux';
import { Grid } from '@chakra-ui/react';
import { useGetPostsQuery } from '../API/PostAPI';
import PostContainer from '../components/PostContainer';
import Spinner from '../components/spinner';
import MarginContainer from '../components/MarginContainer';
import type { PostState } from '../interface';

function Feeds() {
  const { isLoading, data } = useGetPostsQuery('');
  const Post: PostState = useSelector((state: any) => state.Post);

  if (isLoading) return <Spinner />;

  return (
    <div className="top">
      <MarginContainer>
        <h1>Dairy Log</h1>
        {Post.posts.length > 0 ? (
          <Grid gridTemplateColumns={['2']} gap={20}>
            {Post.posts.map((post: any) => (
              <PostContainer key={post._id} post={post} />
            ))}
          </Grid>
        ) : (
          <h1>No posts yet</h1>
        )}
      </MarginContainer>
    </div>
  );
}

export default Feeds;
