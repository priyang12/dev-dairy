import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { BsFillFilterCircleFill } from 'react-icons/bs';
import { useErrorHandler } from 'react-error-boundary';
import { useNewPost } from '../../API/PostAPI';
import { useInfinitePosts } from '../../Hooks/useInfinitePosts';
import { useApiToast } from '../../Hooks/useApiToast';
import PostContainer from './PostContainer';
import Spinner from '../../components/spinner';
import MarginContainer from '../../components/MarginContainer';
import PostModal from './PostModal';
import BgImage from '../../components/BgImage';
import MetaData from '../../Meta/MetaPosts';

function Feeds() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isLoading: LoadingPosts,
    isFetching,
    data: Posts,
    isLastPage,
    TotalPosts,
    error,
    fetchNextPage,
  } = useInfinitePosts();

  const [AddNewPost, Result] = useNewPost();

  useErrorHandler(error);

  useApiToast({
    Result,
    loadingMessage: 'Adding new post...',
    successMessage: 'New post added successfully',
  });

  if (LoadingPosts || !Posts) return <Spinner />;

  return (
    <>
      <MetaData
        title={`
        Posts ${TotalPosts}
      `}
      />

      <Box>
        <BgImage
          minH="100vh"
          backgroundSize="cover"
          backgroundRepeat="repeat"
          BgImageData={{
            url: localStorage.getItem('PostImage')
              ? `https://source.unsplash.com/${localStorage.getItem(
                  'PostImage',
                )}`
              : '',
          }}
        >
          <MarginContainer display="flex" flexDir="column" py={5}>
            <Button
              onClick={onOpen}
              fontSize="3xl"
              p={10}
              borderRadius={['3xl']}
            >
              Create New Entry
            </Button>

            <PostModal
              page={1}
              onClose={onClose}
              isOpen={isOpen}
              action="create"
              actionSubmit={AddNewPost}
            />

            <Flex alignItems="center" justifyContent="center" m={5}>
              <Heading size="4xl" textAlign="center" mb={5}>
                Dairy Log
              </Heading>
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
            </Flex>

            {Posts.length > 0 && (
              <>
                <Flex gap={10} flexDir="column">
                  {Posts.map((data) =>
                    data.posts.map((post) => (
                      <PostContainer
                        key={post._id}
                        post={post}
                        page={data.page}
                      />
                    )),
                  )}
                </Flex>
                {!isLastPage ||
                  (Posts[0].posts.length === 0 && (
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
                  ))}
              </>
            )}
            {(Posts[0].posts.length === 0 || isLastPage) && (
              <Heading textAlign="center">No posts yet</Heading>
            )}
          </MarginContainer>
        </BgImage>
      </Box>
    </>
  );
}

export default Feeds;
