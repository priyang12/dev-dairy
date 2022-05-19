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
  ModalFooter,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import type { IPost } from '../interface';
import { useDeletePostMutation } from '../API/PostAPI';
import type { FormField } from './CustomForm';
import CustomForm from './CustomForm';
import ModalComponent from './ModalComponent';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const deletePost = () => {
    dispatch(mutation(post._id));
  };
  const UpdatePost = () => {};
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <GridItem bgColor="gray.500" color="#fff" p={10} borderRadius={20}>
      <ModalComponent Title="Create Post" isOpen={isOpen} onClose={onClose}>
        <CustomForm FormFields={PostField} SubmitForm={() => {}} mb={2}>
          <Select mb={2} name="status" id="status">
            <option defaultValue="value" value="In-Process">
              In-Process
            </option>
            <option value="Started">Started</option>
            <option value="Done">Done</option>
          </Select>
          <ModalFooter>
            <Button
              // isLoading={NewPostMutaion.isLoading}
              type="submit"
              loadingText="Just a moment ..."
              colorScheme="blue"
              variant="solid"
            >
              New Log
            </Button>
          </ModalFooter>
        </CustomForm>
      </ModalComponent>
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
