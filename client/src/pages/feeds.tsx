import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormLabel,
  Grid,
  Heading,
  ModalFooter,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { useGetPostsQuery, useNewPostMutation } from '../API/PostAPI';
import PostContainer from '../components/PostContainer';
import Spinner from '../components/spinner';
import MarginContainer from '../components/MarginContainer';
import type { INewPost, IPost, IProject, PostState } from '../interface';
import ModalComponent from '../components/ModalComponent';
import type { FormField } from '../components/CustomForm';
import CustomForm from '../components/CustomForm';
import { setPosts } from '../features/PostSlice';
import {
  GetProjectsSelector,
  useGetProjectIdQuery,
  useGetProjectsQuery,
  usePrefetch,
} from '../API/ProjectAPI';

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

function Feeds() {
  const { isLoading } = useGetPostsQuery('');
  const [OptimisticPost, setOptimisticPost] = useState<any>(null);
  const Post: PostState = useSelector((state: any) => state.Post);
  const { data: Projects, isLoading: LoadingProject } = useGetProjectsQuery('');
  const [proId, setproId] = useState('');
  const { data: RoadMap, isFetching: RoadMapFetching } = useGetProjectIdQuery(
    proId,
    {
      skip: !proId,
    },
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [AddNewPost, NewPostMutaion] = useNewPostMutation();

  const ChangeRoadMapSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setproId(e.target.value);
  };

  const NewPost = (e: any, setErrors: any) => {
    e.preventDefault();
    const { title, description, Project, status, roadMap } = e.target.elements;
    const data: any = {
      title: title.value,
      description: description.value,
      project: Project.value,
      status: status.value,
      roadMap: roadMap.value,
    };
    AddNewPost(data);
    setOptimisticPost(data);
    onClose();
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="top">
      <MarginContainer>
        <Button onClick={onOpen} textAlign="center">
          Create New Log
        </Button>
        <ModalComponent Title="Create Post" isOpen={isOpen} onClose={onClose}>
          <CustomForm FormFields={PostField} SubmitForm={NewPost} mb={2}>
            <FormLabel htmlFor="Project">Project</FormLabel>
            <Select
              mb={2}
              name="Project"
              id="Project"
              onChange={ChangeRoadMapSelect}
            >
              <option>Select Project</option>
              {!LoadingProject &&
                Projects?.map((project: IProject) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
            </Select>

            <Select mb={2} name="roadMap" id="roadMap">
              {!LoadingProject ||
                RoadMap?.roadMap?.map((roadMap: any) => (
                  <option key={roadMap._id} value={roadMap._id}>
                    {roadMap.title}
                  </option>
                ))}
            </Select>

            <FormLabel htmlFor="status">status</FormLabel>
            <Select mb={2} name="status" id="status">
              <option defaultValue="value" value="In-Process">
                In-Process
              </option>
              <option value="Started">Started</option>
              <option value="Done">Done</option>
            </Select>

            <ModalFooter>
              <Button
                isLoading={NewPostMutaion.isLoading}
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
        <Heading size="4xl">Dairy Log</Heading>
        {Post.alert && (
          <Alert status={Post.alert.result ? 'success' : 'error'}>
            <AlertIcon />
            <AlertTitle>{Post.alert.message}</AlertTitle>
          </Alert>
        )}
        {OptimisticPost && <PostContainer post={OptimisticPost} />}
        {Post.posts.length > 0 ? (
          <Grid gridTemplateColumns={['2']} gap={10}>
            {Post.posts.map((post: any) => (
              <PostContainer key={post._id} post={post} />
            ))}
          </Grid>
        ) : (
          <h1>No posts yet</h1>
        )}
      </MarginContainer>
    </div>
  );
}

export default Feeds;
