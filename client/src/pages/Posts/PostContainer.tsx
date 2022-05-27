import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Box,
  Button,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from '../../API/PostAPI';
import type { FormField } from '../../components/CustomForm';
import CustomForm from '../../components/CustomForm';
import ModalComponent from '../../components/ModalComponent';

type PropTypes = {
  post: any;
};

const PostField: FormField[] = [
  {
    fieldType: 'text',
    fieldName: 'title',
    placeholder: 'Please enter title of post',
    isRequired: true,
  },
  {
    fieldType: 'text',
    fieldName: 'description',
    placeholder: 'Enter Brief Description',
    isRequired: true,
  },
];

function PostContainer({ post }: PropTypes) {
  const [mutation, { isLoading }] = useDeletePostMutation();
  // const [UpdateMutate, UpdateResult] = useUpdatePostMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const deletePost = () => {
    dispatch(mutation(post._id));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <GridItem bgColor="gray.500" color="#fff" p={10} borderRadius={20}>
      <Box as="article" position="relative">
        <div className="row">
          <p>Title : {post.project.title}</p>
          <p>Process : {post.project.process}</p>
          <div className="col-md-10">
            <p className="lead">{post.title}</p>
            <p className="lead">{post.description}</p>
            <p className="">
              {moment(post.date).format('D MMM YYYY, h:mm:ss')}
            </p>
          </div>
        </div>

        <Box as="div" position="absolute" top={5} right={5}>
          <Menu isLazy closeOnBlur>
            <MenuButton as={Button}>
              <ChevronDownIcon />
            </MenuButton>

            <MenuList>
              <MenuItem onClick={deletePost}>Delete Post</MenuItem>
              <MenuItem onClick={onOpen}>Update Post</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </GridItem>
  );
}

export default PostContainer;
