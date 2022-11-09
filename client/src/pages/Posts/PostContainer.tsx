import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { useDeletePost, useUpdatePostMutation } from '../../API/PostAPI';
import PostModal from './PostModal';
import { GetStatusColor } from '../../utils/GetStatusColor';
import type { IPost } from '../../interface';
import SharePost from './SharePost';
import { assert, primary, space } from '../../Theme';

type PropTypes = {
  post: IPost;
  page: number;
};

function PostContainer({ post, page }: PropTypes) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutation, { isSuccess, isLoading }] = useDeletePost();
  const [UpdateMutate] = useUpdatePostMutation();

  return (
    <Box
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
        <Heading mb="md" fontFamily="Arial">
          Project : &nbsp;
          {post.project.title}
        </Heading>
        <Flex direction="column" fontSize="xl" pl={0}>
          <Box
            bg={primary[700]}
            p={space.sm}
            borderRadius={space.md}
            border="2px solid"
            borderColor={assert[500]}
          >
            <Text as="h3" fontSize="3xl" fontWeight="bold">
              Title : <span>{post.title}</span>
            </Text>
            <Text fontSize="2xl">
              Description : <span>{post.description}</span>
            </Text>
          </Box>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            direction={['column', 'row']}
            my="md"
            gap={space.md}
          >
            <Flex direction="column" gap="md">
              <Text
                bg={GetStatusColor(post.status)}
                color="#fff"
                fontSize={['2xl', '3xl', '4xl']}
                textAlign="center"
                borderRadius={space.sm}
              >
                {post.status}
              </Text>
              <Text fontSize="3xl">
                {format(parseISO(post.date), "yyyy-MM-dd' 'HH:mm")}
              </Text>
            </Flex>
            <Flex gap={space.md} direction="column" w={['100%', 'auto']}>
              <Button onClick={onOpen} bg="red.500" fontSize="2xl">
                Update Post
              </Button>
              <Button
                bg="blue.500"
                isLoading={isLoading}
                loadingText="Deleting Post"
                data-testid={`delete-post-${post._id}`}
                onClick={() => {
                  mutation({ id: post._id, page });
                }}
                fontSize="2xl"
              >
                Delete Post
              </Button>
            </Flex>
          </Flex>
        </Flex>
        {post.status === 'Done' && <SharePost post={post} />}
        {isOpen && (
          <PostModal
            page={page}
            onClose={onClose}
            isOpen={isOpen}
            action="update"
            post={post}
            actionSubmit={UpdateMutate}
          />
        )}
      </Box>
    </Box>
  );
}

export default PostContainer;
