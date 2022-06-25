import type { FormEvent } from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
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
  Switch,
  Text,
  Textarea,
  Spinner as ChakraSpinner,
  useDisclosure,
} from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import invert from 'invert-color';
import {
  useAddRoadMapMutation,
  useDeleteProjectMutation,
  useGetProjectIdQuery,
  useRemoveRoadMapMutation,
  useUpdateProjectMutation,
} from '../../API/ProjectAPI';
import ModalComponent from '../../components/ModalComponent';
import RoadMapModal from '../../components/RoadMapModal';
import Spinner from '../../components/spinner';
import RandomColor from '../../utils/RandomColor';
import useForm from '../../Hooks/useForm';
import { isErrorWithMessage } from '../../utils/helpers';
import Navlayout from '../../layout/Navlayout';
import type { AlertState, IProject } from '../../interface';

function EditProject() {
  const { id } = useParams<{ id: string }>();
  const { alert, result }: AlertState = useSelector(
    (state: any) => state.Alert,
  );

  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: project,
  } = useGetProjectIdQuery(id, {
    skip: !!id,
  });
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
  const [UpdateProjectMutation, UpdateResult] = useUpdateProjectMutation();
  const [RoadMapMutate, RoadMapResult] = useAddRoadMapMutation();
  const [DeleteRoadMap, DeleteMapResult] = useRemoveRoadMapMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ProcessChange = (value: number | any) => {
    SetState((prevState: any) => ({
      ...prevState,
      process: value,
    }));
  };

  const UpdateProject = (e: FormEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    UpdateProjectMutation({ ...FormValues, _id: id });
  };

  useLayoutEffect(() => {
    if (project) {
      const keys = Object.keys(project);

      keys.forEach((key: string) => {
        SetState((prevState: any) => ({
          ...prevState,
          [key]: project[key as keyof IProject],
        }));
      });
    }
  }, [project, SetState]);

  useEffect(() => {
    if (UpdateResult.isSuccess) {
      onClose();
    }
  }, [UpdateResult.isSuccess, onClose]);

  useEffect(() => {
    if (RoadMapResult.isSuccess) {
      onClose();
    }
  }, [RoadMapResult.isSuccess, onClose]);

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

  if (!project) return null;
  return (
    <Navlayout>
      <Container maxW="800px" mb={10}>
        {UpdateResult.isLoading && (
          <Alert status="info" borderRadius={10} my={5}>
            <AlertIcon />
            <strong>Loading...</strong>
          </Alert>
        )}
        {alert && (
          <Alert
            my={5}
            borderRadius={10}
            status={result ? 'success' : 'error'}
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              <strong>{alert}</strong>
            </AlertTitle>
          </Alert>
        )}
        <Heading as="h1" size="lg" mb={4}>
          Edit Project
        </Heading>
        <Flex
          w="100%"
          as="form"
          direction="column"
          gap={5}
          onSubmit={UpdateProject}
        >
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
          <Button type="submit" colorScheme="blue" variant="outline">
            Update Project
          </Button>
        </Flex>
        <Box p={5} my={5} bg="#333">
          {project.roadMap.length > 0 && (
            <Box justifyContent="space-between" alignItems="center" mt={5}>
              {RoadMapResult.isLoading && (
                <Alert>
                  <AlertTitle>Adding RoadMap</AlertTitle>
                  <ChakraSpinner />
                </Alert>
              )}
              <Flex alignItems="center" m={5}>
                <Heading as="h3" fontSize="2xl">
                  Road Map
                </Heading>
                <RoadMapModal onSubmit={RoadMapMutate} projectId={id} />
                {/* <DeleteRoadMapModal
                onSubmit={RoadMapMutate}
                result={RoadMapResult}
                projectId={params.id}
              /> */}
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
                              projectId: id,
                              RoadMapId: road._id,
                            });
                          }}
                        >
                          Delete {road.name}
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
        </Box>
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
            Title="Confirm Delete Project"
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
                loadingText="Deleting..."
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
