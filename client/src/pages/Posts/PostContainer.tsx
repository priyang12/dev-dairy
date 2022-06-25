import moment from 'moment';
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

import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from '../../API/PostAPI';

import PostModal from './PostModal';
import { useGetProjectsQuery } from '../../API/ProjectAPI';
import type { IPost } from '../../interface';

type PropTypes = {
  post: IPost;
};

function PostContainer({ post }: PropTypes) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutation] = useDeletePostMutation();
  const [UpdateMutate, UpdateResult] = useUpdatePostMutation();
  const { data: Projects } = useGetProjectsQuery('');
  const postProject =
    typeof post.project === 'string' &&
    Projects &&
    Projects.find((project: any) => project._id === post.project);

  const deletePost = () => {
    mutation(post._id);
  };

  return (
    <GridItem
      bgColor="gray.500"
      color="#fff"
      position="relative"
      p={10}
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
          {postProject ? postProject.title : post.project.title}
        </Heading>
        <Box fontSize="2xl" w="100%" bg="#333" py={5} px={2} borderRadius={10}>
          Process : &nbsp;
          {postProject ? postProject.process : post.project.process}
          <Progress
            colorScheme="green"
            height="20px"
            size="sm"
            mt={4}
            borderRadius="10px"
            value={postProject ? postProject.process : post.project.process}
          />
        </Box>
        <Flex direction="column" p={5} fontSize="xl" pl={0}>
          <Text fontSize="4xl" fontWeight="bold">
            {post.title}
          </Text>
          <Text>{post.description}</Text>
          <Text
            bg={
              // eslint-disable-next-line no-nested-ternary
              post.status === 'Done'
                ? '#00ff00'
                : // eslint-disable-next-line no-nested-ternary
                post.status === 'In-Process'
                ? '#ffc300'
                : post.status === 'Started'
                ? '#001aff'
                : '#ff0000'
            }
            color="#fff"
            fontSize={['2xl', '3xl', '4xl']}
            width="fit-content"
            px={5}
            py={2}
            mt={5}
            borderRadius={10}
          >
            {post.status}
          </Text>
          <Text alignSelf="flex-end">
            {moment(post.date).format('D MMM YYYY, h:mm:ss')}
          </Text>
        </Flex>

        <Flex justifyContent="space-between" gap={5}>
          <Button onClick={onOpen} colorScheme="twitter" fontSize="2xl">
            Update Post
          </Button>
          <Button colorScheme="red" onClick={deletePost} fontSize="2xl">
            Delete Post
          </Button>
        </Flex>
        {isOpen && (
          <PostModal
            onClose={onClose}
            isOpen={isOpen}
            action="Update"
            post={post}
            actionSubmit={UpdateMutate}
            actionResult={UpdateResult}
          />
        )}
      </Box>
    </GridItem>
  );
}

export default PostContainer;
