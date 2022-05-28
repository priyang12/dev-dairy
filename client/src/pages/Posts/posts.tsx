import { Button, Grid, Heading, useDisclosure } from '@chakra-ui/react';
import { useGetPostsQuery, useNewPostMutation } from '../../API/PostAPI';
import PostContainer from './PostContainer';
import Spinner from '../../components/spinner';
import MarginContainer from '../../components/MarginContainer';

import PostModal from './PostModal';

function Feeds() {
  const { isLoading, data: Posts } = useGetPostsQuery('');
  const [AddNewPost, NewPostMutaion] = useNewPostMutation();

  if (isLoading) return <Spinner />;

  return (
    <div className="top">
      <MarginContainer>
        <PostModal
          action="New"
          actionSubmit={AddNewPost}
          actionResult={NewPostMutaion}
        />
        <Heading size="4xl">Dairy Log</Heading>
        {/* {Post.alert && (
          <Alert status={Post.alert.result ? 'success' : 'error'}>
            <AlertIcon />
            <AlertTitle>{Post.alert.message}</AlertTitle>
          </Alert>
        )} */}

        {Posts.length > 0 ? (
          <Grid gridTemplateColumns={['2']} gap={10}>
            {Posts.map((post: any) => (
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
