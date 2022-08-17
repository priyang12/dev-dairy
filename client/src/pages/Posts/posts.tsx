import {
  Box,
  Button,
  Grid,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Ring } from '@priyang/react-component-lib';
import { Link as RouterLink } from 'react-router-dom';
import { BsFillFilterCircleFill } from 'react-icons/bs';
import { useNewPost } from '../../API/PostAPI';
import PostContainer from './PostContainer';
import Spinner from '../../components/spinner';
import MarginContainer from '../../components/MarginContainer';
import PostModal from './PostModal';
import BgImage from '../../components/BgImage';
import { useApiToast } from '../../Hooks/useApiToast';
import { useInfinitePosts } from '../../Hooks/useInfinitePosts';

function Feeds() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isLoading: LoadingPosts,
    isFetching,
    data: Posts,
    CurrentPage,
    isLastPage,
    fetchNextPage,
  } = useInfinitePosts();

  const [AddNewPost, Result] = useNewPost();

  useApiToast({
    Result,
    loadingMessage: 'Adding new post...',
    successMessage: 'New post added successfully',
  });

  if (LoadingPosts || !Posts) return <Spinner />;

  return (
    <Box>
      <BgImage
        minH="100vh"
        backgroundSize="cover"
        backgroundRepeat="repeat"
        BgImageData={
          {
            // url: 'https://source.unsplash.com/random/?dark-nature',
          }
        }
      >
        <MarginContainer display="flex" flexDir="column" py={5}>
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

          <IconButton
            as={RouterLink}
            aria-label="Filter"
            w="fit-content"
            ml="auto"
            fontSize="3xl"
            to="/posts/filter"
          >
            <BsFillFilterCircleFill />
          </IconButton>

          <PostModal
            page={1}
            onClose={onClose}
            isOpen={isOpen}
            action="New"
            actionSubmit={AddNewPost}
          />

          <Heading size="4xl" textAlign="center" mb={5}>
            Dairy Log
          </Heading>

          {Posts.length > 0 && (
            <>
              <Grid gridTemplateColumns={['2']} gap={10}>
                {Posts.map((post: any) => (
                  <PostContainer
                    key={post._id}
                    post={post}
                    page={CurrentPage}
                  />
                ))}
              </Grid>
              {!isLastPage && (
                <Button
                  loadingText="Loading..."
                  isLoading={isFetching}
                  m={5}
                  onClick={() => {
                    fetchNextPage();
                  }}
                >
                  Load More
                </Button>
              )}
            </>
          )}
          {isLastPage && <Heading textAlign="center">No posts yet</Heading>}
        </MarginContainer>
      </BgImage>
    </Box>
  );
}

export default Feeds;
