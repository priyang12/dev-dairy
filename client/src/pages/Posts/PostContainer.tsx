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
import Spinner from '../../components/spinner';

type PropTypes = {
  post: any;
};

function PostContainer({ post }: PropTypes) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutation] = useDeletePostMutation();
  const [UpdateMutate, UpdateResult] = useUpdatePostMutation();
  const { data: Projects } = useGetProjectsQuery('');
  const postProject =
    typeof post.project === 'string' &&
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
        <div className="row">
          <Heading textAlign="center" mb={5}>
            Project : &nbsp;
            {postProject.title ? postProject.title : post.project.title}
          </Heading>
          <Box
            fontSize="2xl"
            w="100%"
            bg="#333"
            py={5}
            px={2}
            borderRadius={10}
          >
            Process : &nbsp;
            {postProject.process ? postProject.process : post.project.process}
            <Progress
              colorScheme="green"
              height="20px"
              size="sm"
              mt={4}
              borderRadius="10px"
              value={
                postProject.process ? postProject.process : post.project.process
              }
            />
          </Box>
          <Flex direction="column" p={5} fontSize="xl" pl={0}>
            <Text fontSize="3xl">{post.title}</Text>
            <Text>{post.description}</Text>
            <Text alignSelf="flex-end">
              {moment(post.date).format('D MMM YYYY, h:mm:ss')}
            </Text>
          </Flex>
        </div>

        <Flex justifyContent="space-between" gap={5}>
          <Button onClick={onOpen} colorScheme="twitter">
            Update Post
          </Button>
          <Button colorScheme="red" onClick={deletePost}>
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
