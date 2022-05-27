import {
  FormLabel,
  Select,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNewPostMutation } from '../../API/PostAPI';
import {
  useGetProjectIdQuery,
  useGetProjectsQuery,
} from '../../API/ProjectAPI';
import type { IProject } from '../../interface';
import type { FormField } from '../../components/CustomForm';
import CustomForm from '../../components/CustomForm';
import ModalComponent from '../../components/ModalComponent';

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

function PostModal() {
  const [RoadMapColor, setRoadMapColor] = useState('');
  const [proId, setproId] = useState('');
  const { data: Projects, isLoading: LoadingProject } = useGetProjectsQuery('');

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
  const RoadMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const value = e.target.value.split(',');
    setRoadMapColor(value[1]);
  };
  const NewPost = (e: any, setErrors: any) => {
    e.preventDefault();
    const { title, description, Project, status, roadMap } = e.target.elements;
    const data: any = {
      title: title.value,
      description: description.value,
      project: Project.value,
      status: status.value,
      roadMap: roadMap.value.split[0],
    };
    AddNewPost(data);
    setRoadMapColor('');
    setproId('');
    onClose();
  };
  return (
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

        <Select
          mb={2}
          name="roadMap"
          id="roadMap"
          bgColor={RoadMapColor}
          onChange={RoadMapChange}
        >
          <option>Select RoadMap</option>
          {!RoadMapFetching &&
            RoadMap?.roadMap?.map((roadMap: any) => (
              <option key={roadMap._id} value={[roadMap._id, roadMap.color]}>
                {roadMap.name}
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
  );
}

export default PostModal;
