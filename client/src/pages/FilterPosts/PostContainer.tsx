import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  Progress,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { useDeleteFilterPost, useUpdateFilterPost } from '../../API/PostAPI';
import PostModal from './PostModal';
import { GetStatusColor } from '../../utils/GetStatusColor';
import type { IPost } from '../../interface';

type PropTypes = {
  post: IPost;
};

function PostContainer({ post }: PropTypes) {
  const { search } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutation, { isLoading }] = useDeleteFilterPost();
  const [UpdateMutate] = useUpdateFilterPost();

  return (
    <Box
      bgColor="primary.500"
      color="#fff"
      position="relative"
      p={5}
      borderRadius="20px"
      bg="#ffffff6c"
      border="1px solid #fff"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: 'blur(10px) saturate(200%)',
        borderRadius: '20px',
      }}
    >
      <Box as="article" position="relative">
        <Heading textAlign="center" mb={5}>
          Project : &nbsp;
          {post.project.title}
        </Heading>
        <Box fontSize="2xl" w="100%" bg="#333" py={3} px={2} borderRadius={10}>
          Process : &nbsp;
          {post.project.process}
          <Progress
            colorScheme="green"
            height="10px"
            size="sm"
            mt={4}
            borderRadius="10px"
            value={post.project.process}
          />
        </Box>
        <Flex direction="column" p={5} fontSize="xl" pl={0}>
          <Text fontSize="4xl" fontWeight="bold">
            {post.title}
          </Text>

          <Text>{post.description}</Text>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            direction={['column', 'row']}
          >
            <Flex direction="column">
              <Text
                bg={GetStatusColor(post.status)}
                color="#fff"
                fontSize={['2xl', '3xl', '4xl']}
                width="fit-content"
                p={2}
                my={5}
                borderRadius={10}
              >
                {post.status}
              </Text>
              <Text>{format(parseISO(post.date), "yyyy-MM-dd' 'HH:mm")}</Text>
            </Flex>
            <Flex gap={5} direction="column">
              <Button onClick={onOpen} bg="red.500" fontSize="2xl">
                Update Post
              </Button>
              <Button
                bg="blue.500"
                isLoading={isLoading}
                loadingText="Deleting Post"
                data-testid={`delete-post-${post._id}`}
                onClick={() => {
                  mutation({
                    id: post._id,
                    filter: search || '',
                  });
                }}
                fontSize="2xl"
              >
                Delete Post
              </Button>
            </Flex>
          </Flex>
        </Flex>

        {isOpen && (
          <PostModal
            onClose={onClose}
            filter={search || ''}
            isOpen={isOpen}
            action="Update"
            post={post}
            actionSubmit={UpdateMutate}
          />
        )}
      </Box>
    </Box>
  );
}

export default PostContainer;
