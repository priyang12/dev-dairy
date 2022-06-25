import {
  Alert,
  Button,
  Flex,
  Grid,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import { useGetPostsQuery, useNewPostMutation } from '../../API/PostAPI';
import PostContainer from './PostContainer';
import Spinner from '../../components/spinner';
import MarginContainer from '../../components/MarginContainer';

import PostModal from './PostModal';
import NavLayout from '../../layout/Navlayout';

function Feeds() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isFetching, data: Posts } = useGetPostsQuery('');
  const [AddNewPost, NewPostMutaion] = useNewPostMutation();

  if (isLoading || isFetching) return <Spinner />;

  if (NewPostMutaion.isSuccess) {
    //  Alert
  }
  if (!Posts) return <div>No Posts</div>;
  return (
    <NavLayout>
      <MarginContainer display="flex" flexDir="column">
        <Button onClick={onOpen} fontSize="3xl" p={10} m="auto" my={5}>
          Create New Entry
        </Button>
        {NewPostMutaion.isLoading && <Alert>Creating New Entry</Alert>}
        <PostModal
          onClose={onClose}
          isOpen={isOpen}
          action="New"
          actionSubmit={AddNewPost}
          actionResult={NewPostMutaion}
        />

        <Heading size="4xl" textAlign="center" mb={5}>
          Dairy Log
        </Heading>
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
    </NavLayout>
  );
}

export default Feeds;
