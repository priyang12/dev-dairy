import {
  Box,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { BsFillFilterCircleFill } from 'react-icons/bs';
import { useEffect } from 'react';
import { useGetPostsQuery } from '../../API/PostAPI';
import PostContainer from './PostContainer';
import Spinner from '../../components/spinner';
import MarginContainer from '../../components/MarginContainer';
import BgImage from '../../components/BgImage';
import FilterMenu from './FilterMenu';
import MetaFilterPosts from '../../Meta/MetaFilterPosts';

function Feeds() {
  const { search } = useLocation();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { isLoading: LoadingPosts, data: Posts } = useGetPostsQuery(search, {
    skip: !search,
  });
  useEffect(() => {
    onToggle();
  }, []);

  if (LoadingPosts) return <Spinner />;

  return (
    <Box>
      <MetaFilterPosts title={`Posts ${Posts?.length}`} description="asdasd" />
      <BgImage
        minH="100vh"
        backgroundSize="cover"
        backgroundRepeat="repeat"
        BgImageData={{
          url: localStorage.getItem('PostImage')
            ? `https://source.unsplash.com/${localStorage.getItem('PostImage')}`
            : '',
        }}
      >
        <MarginContainer display="flex" flexDir="column" py={5}>
          <Heading size="4xl" textAlign="center" mb={5}>
            Filter Log
            <IconButton
              aria-label="Filter"
              ml={5}
              fontSize="3xl"
              onClick={onToggle}
            >
              <BsFillFilterCircleFill />
            </IconButton>
          </Heading>
          {isOpen && <FilterMenu onClose={onClose} />}

          {!search && (
            <Heading size="2xl" textAlign="center" mb={5}>
              No Filter Applied
            </Heading>
          )}
          {Posts && Posts.length > 0 ? (
            <Flex flexDir="column" gap={10}>
              {Posts.map((post) => (
                <PostContainer key={post._id} post={post} />
              ))}
            </Flex>
          ) : (
            search && <Heading textAlign="center">No posts yet</Heading>
          )}
        </MarginContainer>
      </BgImage>
    </Box>
  );
}

export default Feeds;
