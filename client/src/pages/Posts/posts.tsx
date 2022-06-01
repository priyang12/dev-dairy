import { Button, Grid, Heading, useDisclosure } from '@chakra-ui/react';
import { useGetPostsQuery, useNewPostMutation } from '../../API/PostAPI';
import PostContainer from './PostContainer';
import Spinner from '../../components/spinner';
import MarginContainer from '../../components/MarginContainer';

import PostModal from './PostModal';

function Feeds() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isFetching, data: Posts } = useGetPostsQuery('');
  const [AddNewPost, NewPostMutaion] = useNewPostMutation();

  if (isLoading || isFetching) return <Spinner />;

  if (NewPostMutaion.isSuccess && isOpen) {
    onClose();
  }
  return (
    <div className="top">
      <MarginContainer>
        <Button onClick={onOpen}>Create New Entry</Button>
        <PostModal
          onClose={onClose}
          isOpen={isOpen}
          action="New"
          actionSubmit={AddNewPost}
          actionResult={NewPostMutaion}
        />
        <Heading size="4xl">Dairy Log</Heading>

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
