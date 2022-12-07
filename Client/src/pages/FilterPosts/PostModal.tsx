import {
  FormLabel,
  Select,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Skeleton,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useGetProjects, useGetRoadMaps } from '../../API/ProjectAPI';
import ModalComponent from '../../components/ModalComponent';
import { ValidateDescription, ValidateTitle } from '../../utils/Validation';
import type { IPost } from '../../interface';

interface Props {
  action: string;
  post?: IPost;
  actionSubmit: (data: any) => void;
  onClose: () => void;
  isOpen: boolean;
  filter: string;
}

interface PostFields {
  title: string;
  description: string;
  Project: string;
  status: string;
  roadMap: string;
}

const init = {
  title: '',
  Project: '',
  description: '',
  roadMap: '',
  status: '',
};
function PostModal({
  action,
  filter,
  post,
  actionSubmit,
  onClose,
  isOpen,
}: Props) {
  const [RoadMapColor, setRoadMapColor] = useState('');
  const [ErrorState, setErrorState] = useState<PostFields>(init);
  const [proId, setproId] = useState(post?.project._id);
  const { data: Projects, isLoading: LoadingProject } = useGetProjects('');

  const { data: RoadMap, isFetching: RoadMapFetching } = useGetRoadMaps(proId, {
    skip: !proId,
  });

  const ChangeRoadMapSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setproId(e.target.value);
  };
  const RoadMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.split(',');
    setRoadMapColor(value[1]);
  };
  const ResetModal = () => {
    setErrorState(init);
    setRoadMapColor('');
    setproId('');
    onClose();
  };
  const submit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const { title, description, Project, status, roadMap } = e.target
      .elements as typeof e.target.elements & PostFields;
    const ErrorTitle = ValidateTitle(title.value, 'Title');
    const ErrorDes = ValidateDescription(description.value);
    const ErrorProject =
      Project.value === 'Select Project' ? 'Project is Required' : '';
    const ErrorRoadMap =
      roadMap.value === 'Select RoadMap' ? 'RoadMap is Required' : '';

    if (ErrorTitle || ErrorDes || ErrorProject || ErrorRoadMap) {
      setErrorState({
        title: ErrorTitle,
        description: ErrorDes,
        Project: ErrorProject,
        roadMap: ErrorRoadMap,
        status: '',
      });
    } else {
      const data = {
        _id: post?._id,
        title: title.value,
        description: description.value,
        project: Project.value,
        status: status.value,
        roadMap: roadMap.value.split(',')[0],
      };

      actionSubmit({
        UpdatedPost: data,
        filter,
      });
      ResetModal();
    }
  };

  return (
    <ModalComponent Title={`${action} Log`} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={submit}>
        <FormControl isInvalid={!!ErrorState.title}>
          <FormLabel htmlFor="title" spellCheck>
            Title
          </FormLabel>
          <Input
            type="text"
            name="title"
            id="title"
            defaultValue={post?.title}
          />
          <FormErrorMessage>{ErrorState.title}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!ErrorState.description}>
          <FormLabel htmlFor="description" spellCheck>
            Description
          </FormLabel>
          <Textarea
            name="description"
            id="description"
            defaultValue={post?.description}
          />
          <FormErrorMessage>{ErrorState.description}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!ErrorState.Project}>
          <FormLabel htmlFor="Project">Project</FormLabel>
          {LoadingProject ? (
            <Skeleton>
              <div>Loading Projects</div>
            </Skeleton>
          ) : (
            <Select
              mb={2}
              name="Project"
              id="Project"
              value={post?.project._id}
              onChange={ChangeRoadMapSelect}
            >
              <option>Select Project</option>

              {Projects?.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </Select>
          )}

          <FormErrorMessage>{ErrorState.Project}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!ErrorState.roadMap}>
          <FormLabel htmlFor="roadMap" hidden>
            RoadMap
          </FormLabel>
          {RoadMapFetching ? (
            <Skeleton>
              <div>Loading RoadMap</div>
            </Skeleton>
          ) : (
            <Select
              mb={2}
              name="roadMap"
              id="roadMap"
              defaultValue={(post?.roadMap, '#333')}
              bgColor={RoadMapColor}
              onChange={RoadMapChange}
            >
              <option>Select RoadMap</option>
              {RoadMap?.map((roadMap) => (
                <option
                  key={roadMap._id}
                  value={[roadMap._id, roadMap.color ? roadMap.color : '#333']}
                >
                  {roadMap.name}
                </option>
              ))}
            </Select>
          )}
          <FormErrorMessage>{ErrorState.roadMap}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="status">status</FormLabel>
          <Select mb={2} name="status" id="status" defaultValue={post?.status}>
            <option value="Not Started">Not Started</option>
            <option value="In-Process">In-Process</option>
            <option value="Started">Started</option>
            <option value="Done">Done</option>
          </Select>
        </FormControl>
        <ModalFooter>
          <Button type="submit" colorScheme="blue" variant="solid">
            Update New Log
          </Button>
        </ModalFooter>
      </form>
    </ModalComponent>
  );
}

PostModal.defaultProps = {
  post: null,
};
export default PostModal;
