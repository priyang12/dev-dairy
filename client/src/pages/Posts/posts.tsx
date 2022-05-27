import { Button, Grid, Heading, useDisclosure } from '@chakra-ui/react';
import { useGetPostsQuery, useNewPostMutation } from '../../API/PostAPI';
import PostContainer from './PostContainer';
import Spinner from '../../components/spinner';
import MarginContainer from '../../components/MarginContainer';

import PostModal from './PostModal';

function Feeds() {
  const { isLoading, data: Posts } = useGetPostsQuery('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isLoading) return <Spinner />;

  return (
    <div className="top">
      <MarginContainer>
        <Button onClick={onOpen} textAlign="center">
          Create New Log
        </Button>
        <PostModal />
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
