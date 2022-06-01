import moment from 'moment';
import { Box, Button, GridItem, useDisclosure } from '@chakra-ui/react';

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
  const [mutation, { isLoading }] = useDeletePostMutation();
  const [UpdateMutate, UpdateResult] = useUpdatePostMutation();
  const { data: Projects } = useGetProjectsQuery('');
  const postProject =
    typeof post.project === 'string' &&
    Projects.find((project: any) => project._id === post.project);

  const deletePost = () => {
    mutation(post._id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <GridItem bgColor="gray.500" color="#fff" p={10} borderRadius={20}>
      <Box as="article" position="relative">
        <div className="row">
          <p>
            Title : {postProject.title ? postProject.title : post.project.title}
          </p>
          <p>
            Process :
            {postProject.process ? postProject.process : post.project.process}
          </p>
          <div className="col-md-10">
            <p className="lead">{post.title}</p>
            <p className="lead">{post.description}</p>
            <p className="">
              {moment(post.date).format('D MMM YYYY, h:mm:ss')}
            </p>
          </div>
        </div>

        <Button colorScheme="red" onClick={deletePost}>
          Delete Post
        </Button>
        <Button onClick={onOpen}>Update Post</Button>
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
