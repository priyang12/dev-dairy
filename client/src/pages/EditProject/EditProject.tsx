import { useLayoutEffect } from 'react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Switch,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import invert from 'invert-color';
import {
  useAddRoadMapMutation,
  useDeleteProjectMutation,
  useGetProjectIdQuery,
  useRemoveRoadMapMutation,
} from '../../API/ProjectAPI';
import DeleteRoadMapModal from '../../components/DeleteRoadMap';
import ModalComponent from '../../components/ModalComponent';
import RoadMapModal from '../../components/RoadMapModal';
import Spinner from '../../components/spinner';

import RandomColor from '../../utils/RandomColor';
import useForm from '../../Hooks/useForm';
import { isErrorWithMessage } from '../../utils/helpers';
import Navlayout from '../../layout/Navlayout';

function EditProject() {
  const params = useParams();

  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: project,
  } = useGetProjectIdQuery(params.id);
  const { FormValues, ErrorsState, HandleChange, SetState, setError } = useForm(
    {
      Title: '',
      Description: '',
      process: 5,
      Github: '',
      Live: false,
      Website: '',
      NewTech: '',
    },
  );
  const [DeleteProjectMutation, DeleteResult] = useDeleteProjectMutation();
  const [RoadMapMutate, RoadMapResult] = useAddRoadMapMutation();
  const [DeleteRoadMap, DeleteMapResult] = useRemoveRoadMapMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ProcessChange = (value: number | any) => {
    SetState((prevState: any) => ({
      ...prevState,
      process: value,
    }));
  };

  useLayoutEffect(() => {
    if (project) {
      const keys = Object.keys(project);
      keys.forEach((key) => {
        SetState((prevState: any) => ({
          ...prevState,
          [key]: project[key],
        }));
      });
    }
  }, [project, SetState]);

  if (isFetching || isLoading) return <Spinner />;

  if (isError && isErrorWithMessage(error)) {
    return (
      <div className="top">
        {error.message ? error.message : 'Server Error'}
      </div>
    );
  }

  if (DeleteResult.isSuccess) {
    return <Navigate to="/projects" />;
  }

  return (
    <Navlayout>
      <Container maxW="800px" mb={10}>
        <Heading as="h1" size="lg" mb={4}>
          Edit Project
        </Heading>
        <Flex w="100%" as="form" direction="column" gap={5}>
          <FormControl isRequired isInvalid={ErrorsState.Title}>
            {ErrorsState.Title ? (
              <FormLabel color="red">{ErrorsState.Title}</FormLabel>
            ) : (
              <FormLabel htmlFor="Title">Title : </FormLabel>
            )}

            <Input
              id="title"
              placeholder="Pick Good Project Title"
              defaultValue={FormValues.title}
              onChange={HandleChange}
              required
            />
          </FormControl>
          <FormControl isInvalid={ErrorsState.Description} isRequired>
            {ErrorsState.Description ? (
              <FormLabel color="red">{ErrorsState.Description}</FormLabel>
            ) : (
              <FormLabel htmlFor="Description">Description : </FormLabel>
            )}

            <Textarea
              id="description"
              placeholder=" Project Description"
              rows={10}
              value={FormValues.description}
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
              value={FormValues.Live}
              onChange={(e) => {
                SetState({
                  ...FormValues,
                  Live: e.target.checked,
                });
              }}
            />
          </FormControl>
        </Flex>
        {project.roadMap && (
          <Box justifyContent="space-between" alignItems="center" mt={5}>
            <Flex alignItems="center" m={5}>
              <Heading as="h3" fontSize="2xl">
                Road Map
              </Heading>
              <RoadMapModal
                onSubmit={RoadMapMutate}
                result={RoadMapResult}
                projectId={params.id}
              />
              <DeleteRoadMapModal
                onSubmit={RoadMapMutate}
                result={RoadMapResult}
                projectId={params.id}
              />
            </Flex>

            <Accordion allowToggle>
              {project.roadMap.map((road: any) => (
                <AccordionItem key={road._id}>
                  <AccordionButton>
                    <Text
                      key={road.name}
                      p={2}
                      bg={`${road.color ? road.color : RandomColor()}`}
                      color={`${
                        road.color ? invert(road.color) : RandomColor()
                      }`}
                      fontSize={20}
                      borderRadius={10}
                      width="100%"
                    >
                      {road.name}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <>
                      Work {road.progress} %
                      <Progress
                        colorScheme="green"
                        height="20px"
                        size="sm"
                        mt={4}
                        borderRadius="10px"
                        value={road.progress}
                      />
                      <Button
                        colorScheme="red"
                        mt={5}
                        isLoading={DeleteMapResult.isLoading}
                        loadingText="Deleting..."
                        onClick={() => {
                          DeleteRoadMap({
                            projectId: params.id,
                            RoadMapId: road._id,
                          });
                        }}
                      >
                        Delete {road.name} RoadMap
                      </Button>
                    </>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            {project.github && (
              <Box mt={5}>
                <Text>
                  <a href={project.github}>Github Link</a>
                </Text>
              </Box>
            )}
          </Box>
        )}
        <Container mt={5}>
          <Button
            colorScheme="red"
            w="100%"
            variant="outline"
            onClick={onOpen}
            _hover={{
              bg: 'red',
              color: 'white',
            }}
          >
            Delete Project
          </Button>
          <ModalComponent
            Title="Delete Project"
            isOpen={isOpen}
            onClose={onClose}
          >
            <Box>
              <Text>Are you sure you want to delete this project?</Text>
              <Button
                colorScheme="red"
                w="100%"
                variant="outline"
                _hover={{
                  bg: 'red',
                  color: 'white',
                }}
                isLoading={DeleteResult.isLoading}
                onClick={() => {
                  DeleteProjectMutation(project._id);
                }}
              >
                Delete
              </Button>
            </Box>
          </ModalComponent>
        </Container>
      </Container>
    </Navlayout>
  );
}

export default EditProject;
