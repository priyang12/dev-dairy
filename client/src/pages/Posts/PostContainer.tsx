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
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from '../../API/PostAPI';
import PostModal from './PostModal';
import { useGetProjectsQuery } from '../../API/ProjectAPI';
import { GetTaskColor } from '../../utils/GetStatusColor';
import type { IPost } from '../../interface';

type PropTypes = {
  post: IPost;
};

function PostContainer({ post }: PropTypes) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [mutation] = useDeletePostMutation();
  const [UpdateMutate, UpdateResult] = useUpdatePostMutation();
  const { data: Projects } = useGetProjectsQuery('');
  const postProject = typeof post.project === 'string'
    ? post.project
    : Projects?.find((project: any) => project._id === post.project);

  const deletePost = () => {
    mutation(post._id);
  };
  if (typeof postProject === 'string') return null;
  return (
    <GridItem
      bgColor="gray.500"
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
          {postProject?.title ? postProject.title : post.project.title}
        </Heading>
        <Box fontSize="2xl" w="100%" bg="#333" py={3} px={2} borderRadius={10}>
          Process : &nbsp;
          {postProject ? postProject.process : post.project.process}
          <Progress
            colorScheme="green"
            height="10px"
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
          <Flex justifyContent="space-between" alignItems="center">
            <Flex direction="column">
              <Text
                bg={GetTaskColor(post.status)}
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
              <Button bg="blue.500" onClick={deletePost} fontSize="2xl">
                Delete Post
              </Button>
            </Flex>
          </Flex>
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
