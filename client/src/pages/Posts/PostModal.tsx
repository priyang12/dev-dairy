import {
  FormLabel,
  Select,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Skeleton,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import {
  useGetProjectIdQuery,
  useGetProjectsQuery,
} from '../../API/ProjectAPI';
import type { INewPost, IPost, IProject } from '../../interface';
import ModalComponent from '../../components/ModalComponent';

interface Props {
  action: string;
  post?: IPost;
  actionSubmit: (data: any) => void;
  actionResult: any;
  onClose: () => void;
  isOpen: boolean;
}

function PostModal({
  action,
  post,
  actionSubmit,
  actionResult,
  onClose,
  isOpen,
}: Props) {
  const [RoadMapColor, setRoadMapColor] = useState('');
  const [proId, setproId] = useState(post?.project ? post.project._id : '');
  const { data: Projects, isLoading: LoadingProject } = useGetProjectsQuery('');

  const { data: RoadMap, isFetching: RoadMapFetching } = useGetProjectIdQuery(
    proId,
    {
      skip: !proId,
    },
  );

  const ChangeRoadMapSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setproId(e.target.value);
  };
  const RoadMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.split(',');
    setRoadMapColor(value[1]);
  };
  const ResetModal = () => {
    setRoadMapColor('');
    setproId('');
    onClose();
  };
  const submit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    const { title, description, Project, status, roadMap } = e.target
      .elements as typeof e.target.elements & any;

    const data: INewPost | any = {
      title: title.value,
      description: description.value,
      project: Project.value,
      status: status.value,
      roadMap: roadMap.value.split(',')[0],
    };
    if (action !== 'New') {
      data._id = post?._id;
    }

    actionSubmit(data);
    ResetModal();
  };

  return (
    <ModalComponent Title={`${action} Log`} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={submit}>
        <FormLabel htmlFor="title" spellCheck>
          Title
        </FormLabel>
        <Input type="text" name="title" id="title" defaultValue={post?.title} />
        <FormLabel htmlFor="description" spellCheck>
          Description
        </FormLabel>
        <Textarea
          name="description"
          id="description"
          defaultValue={post?.description}
        />
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
            value={post?.project?._id}
            onChange={ChangeRoadMapSelect}
          >
            <option>Select Project</option>

            {Projects?.map((project: IProject) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </Select>
        )}
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
            bgColor={RoadMapColor}
            onChange={RoadMapChange}
          >
            <option>Select RoadMap</option>
            {RoadMap?.roadMap.map((roadMap: any) => (
              <option key={roadMap._id} value={[roadMap._id, roadMap.color]}>
                {roadMap.name}
              </option>
            ))}
          </Select>
        )}

        <FormLabel htmlFor="status">status</FormLabel>
        <Select mb={2} name="status" id="status" defaultValue={post?.status}>
          <option value="In-Process">In-Process</option>
          <option value="Started">Started</option>
          <option value="Done">Done</option>
        </Select>
        <ModalFooter>
          <Button
            isLoading={actionResult.isLoading}
            type="submit"
            loadingText="Wait just for it..."
            colorScheme="blue"
            variant="solid"
          >
            {action === 'New' ? 'Create Log' : 'Update New Log'}
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
