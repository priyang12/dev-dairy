import { AddIcon, ArrowForwardIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Textarea,
  Flex,
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
} from '@chakra-ui/react';

import { useState } from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import { useCreateProjectMutation } from '../../API/ProjectAPI';
import type { IProject } from '../../interface';
import useForm from '../../Hooks/useForm';
import {
  CheckURL,
  ValidateDescription,
  ValidateTitle,
} from '../../utils/Validation';

interface RoadMap {
  title: string;
  color: string;
}

interface NewProjectInterface {
  Title: string;
  Description: string;
  process: number;
  Github: string;
  Live: boolean;
  Website: string;
  NewTech: string;
}

const init: NewProjectInterface = {
  Title: '',
  Description: '',
  process: 5,
  Github: '',
  Live: false,
  Website: '',
  NewTech: '',
};

function NewProject() {
  const [CreateProject, CreateProjectResult] = useCreateProjectMutation();
  const [NewTech, setNewTech] = useState('');
  const [Technologies, setTechnologies] = useState<any[]>([]);
  const [NewRoadMap, setNewRoadMap] = useState<any>({
    title: '',
    color: '#000',
  });
  const [RoadMaps, setRoadMaps] = useState<RoadMap[]>([]);
  const { FormValues, ErrorsState, HandleChange, SetState, setError } =
    useForm(init);

  const AddNewTech = () => {
    if (!ErrorsState.NewTech) {
      setTechnologies([...Technologies, FormValues.NewTech]);
      setNewTech('');
      SetState({ ...FormValues, NewTech: '' });
    }
  };
  const AddNewRoadMap = () => {
    setRoadMaps([...RoadMaps, NewRoadMap]);
    setNewRoadMap({
      title: '',
      color: '',
    });
  };
  const DeleteTech = (index: number) => {
    const newTechs = [...Technologies];
    newTechs.splice(index, 1);
    setTechnologies(newTechs);
  };
  const ProcessChange = (value: number | any) => {
    SetState({ ...FormValues, process: value });
  };

  const AddNewProject = () => {
    const { Title, Description, process, Github, Live, Website } = FormValues;
    const newRoadMaps = [...RoadMaps];
    const newTechs = [...Technologies];

    const TitleError = setError('Title', ValidateTitle(Title, 'Title'));
    const DescriptionError = setError(
      'Description',
      ValidateDescription(Description, 'Description'),
    );
    let GithubError = null;
    let WebsiteError = null;
    if (Github && !CheckURL(Github)) {
      GithubError = setError('Github', 'Enter Valid Github Link');
    }
    if (Website && !CheckURL(Website)) {
      WebsiteError = setError('Website', 'Enter Valid URL for Website');
    }
    const newProject: IProject | any = {
      title: Title,
      description: Description,
      process,
      github: Github,
      live: Live,
      website: Website,
      RoadMaps: newRoadMaps,
      technologies: newTechs,
    };

    if (!TitleError || !DescriptionError || !GithubError || !WebsiteError) {
      CreateProject(newProject);
    }
  };
  if (CreateProjectResult.isSuccess) {
    return <Redirect to="/Projects" />;
  }
  return (
    <Box>
      <Container className="top" maxW="1000px" pb={10}>
        <Heading size="lg">New Project</Heading>
        <Flex
          mt={5}
          direction={['column', 'column', 'row']}
          justifyContent="space-between"
          gap={10}
        >
          <Flex w="100%" as="form" direction="column" gap={5}>
            <FormControl isRequired isInvalid={!!ErrorsState.Title}>
              {ErrorsState.Title ? (
                <FormLabel color="red">{ErrorsState.Title}</FormLabel>
              ) : (
                <FormLabel htmlFor="Title">Title : </FormLabel>
              )}

              <Input
                id="Title"
                placeholder="Pick Good Project Title"
                value={FormValues.Title}
                onChange={HandleChange}
                required
              />
            </FormControl>
            <FormControl isInvalid={!!ErrorsState.Description} isRequired>
              {ErrorsState.Description ? (
                <FormLabel color="red">{ErrorsState.Description}</FormLabel>
              ) : (
                <FormLabel htmlFor="Description">Description : </FormLabel>
              )}

              <Textarea
                id="Description"
                placeholder=" Project Description"
                rows={10}
                onChange={HandleChange}
                required
              />
              <FormHelperText>
                Write a thoroughly Description for your project
              </FormHelperText>
            </FormControl>

            <FormControl isRequired gap={5}>
              <FormLabel htmlFor="Process">Process</FormLabel>
              <NumberInput
                maxW="100px"
                mr="2rem"
                id="Process"
                value={FormValues.process}
                onChange={ProcessChange}
                min={0}
                max={100}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                aria-label="slider-ex-3"
                defaultValue={30}
                flex="1"
                focusThumbOnChange={false}
                value={FormValues.process}
                onChange={ProcessChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="tomato" as={ArrowForwardIcon} />
                </SliderThumb>
              </Slider>
            </FormControl>
            <FormControl>
              {ErrorsState.Github ? (
                <FormLabel color="red">{ErrorsState.Github}</FormLabel>
              ) : (
                <FormLabel htmlFor="Github">Github : </FormLabel>
              )}

              <Input
                name="github"
                id="Github"
                type="url"
                placeholder="Github Link"
                value={FormValues.Github}
                onChange={HandleChange}
              />
            </FormControl>
            <FormControl>
              {ErrorsState.Website ? (
                <FormLabel color="red">{ErrorsState.Website}</FormLabel>
              ) : (
                <FormLabel htmlFor="Website">Website : </FormLabel>
              )}

              <Input
                name="Website"
                id="Website"
                disabled={!FormValues.Live}
                placeholder="Website Link"
                value={FormValues.Website}
                onChange={HandleChange}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="Live" mb="0">
                Is Live?
              </FormLabel>
              <Switch
                id="Live"
                onChange={(e) => {
                  SetState({
                    ...FormValues,
                    Live: e.target.checked,
                  });
                }}
              />
            </FormControl>
          </Flex>
          <Flex
            w={['100%', '70%', '50%']}
            m={['auto, 0']}
            gap={5}
            direction="column"
          >
            <FormControl isInvalid={!!ErrorsState.NewTech}>
              {ErrorsState.NewTech ? (
                <FormLabel color="red">Enter Name</FormLabel>
              ) : (
                <FormLabel htmlFor="NewTech">Technologies : </FormLabel>
              )}
              <Flex gap={5}>
                <Input
                  id="NewTech"
                  placeholder="Pick Good Project Title"
                  value={FormValues.NewTech}
                  onChange={HandleChange}
                />
                <Button
                  type="submit"
                  data-testid="add-tech"
                  loadingText="Just a moment ..."
                  colorScheme="blue"
                  variant="solid"
                  onClick={AddNewTech}
                >
                  <AddIcon color="white" />
                </Button>
              </Flex>
            </FormControl>
            {Technologies.map((tech: any, index) => (
              <Flex alignItems="center" gap={5} key={tech}>
                <Input defaultValue={tech} bg="blue.800" disabled />
                <DeleteIcon
                  color="red"
                  data-testid={`delete-tech-${index}`}
                  cursor="pointer"
                  onClick={() => {
                    DeleteTech(index);
                  }}
                />
              </Flex>
            ))}
            <Flex direction="column" as={FormControl} gap={5}>
              <FormLabel htmlFor="RoadMap">RoadMap</FormLabel>
              <Flex gap={5}>
                <Input
                  type="text"
                  id="RoadMap"
                  name="RoadMap"
                  value={NewRoadMap.title}
                  onChange={(e) => {
                    setNewRoadMap({
                      ...NewRoadMap,
                      title: e.target.value,
                    });
                  }}
                />
                <FormLabel htmlFor="Color" hidden>
                  Color
                </FormLabel>
                <Input
                  id="Color"
                  type="color"
                  w="30%"
                  onChange={(e) => {
                    setNewRoadMap({
                      ...NewRoadMap,
                      color: e.target.value,
                    });
                  }}
                />
                <Button
                  type="submit"
                  colorScheme="blue"
                  data-testid="add-RoadMap"
                  variant="solid"
                  onClick={AddNewRoadMap}
                >
                  <AddIcon color="white" />
                </Button>
              </Flex>
              {RoadMaps.map((roadMap: RoadMap, index: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <Flex alignItems="center" gap={5} key={index}>
                  <Input bg={roadMap.color} disabled value={roadMap.title} />
                  <DeleteIcon
                    color="red.700"
                    _hover={{
                      color: 'red',
                    }}
                    data-testid="delete-roadMap"
                    cursor="pointer"
                    onClick={() => {
                      const newRoadMaps = [...RoadMaps];
                      newRoadMaps.splice(index, 1);
                      setRoadMaps(newRoadMaps);
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Button
          w="100%"
          p={10}
          mt={10}
          loadingText="Add Project"
          isLoading={CreateProjectResult.isLoading}
          onClick={AddNewProject}
        >
          Create Project
        </Button>
      </Container>
    </Box>
  );
}

export default NewProject;
