import {
  Box,
  Button,
  Grid,
  Heading,
  useDisclosure,
  Spinner as ChakraSpinner,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { Ring } from '@priyang/react-component-lib';
import { useEffect } from 'react';
import { useGetPostsQuery, useNewPostMutation } from '../../API/PostAPI';
import PostContainer from './PostContainer';
import Spinner from '../../components/spinner';
import MarginContainer from '../../components/MarginContainer';
import PostModal from './PostModal';
import BgImage from '../../components/BgImage';

function Feeds() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isFetching, data: Posts } = useGetPostsQuery(null);

  const [AddNewPost, { isSuccess, isLoading: CreatingPost, isError }] =
    useNewPostMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Successfully created!');
    }
  }, [isSuccess]);
  useEffect(() => {
    if (CreatingPost) {
      toast.loading('Creating Post...', {
        icon: <ChakraSpinner />,
      });
    }
  }, [CreatingPost]);

  useEffect(() => {
    if (isError) {
      toast.error('Error creating post!');
    }
  }, [isError]);

  if (isLoading || isFetching) return <Spinner />;
  if (!Posts) return <div>No Posts</div>;

  return (
    <Box>
      <BgImage
        BgImageData={{
          url: 'https://source.unsplash.com/random/?dark-nature',
        }}
      >
        <MarginContainer display="flex" flexDir="column">
          <Ring
            radius="15px"
            ringColor="#080808"
            w="fit-content"
            m="auto"
            my={10}
          >
            <Button onClick={onOpen} fontSize="3xl" p={10}>
              Create New Entry
            </Button>
          </Ring>
          <PostModal
            onClose={onClose}
            isOpen={isOpen}
            action="New"
            actionSubmit={AddNewPost}
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
      </BgImage>
    </Box>
  );
}

export default Feeds;
