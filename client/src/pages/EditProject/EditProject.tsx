import type { FormEvent } from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { Link as RouterLink, Navigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
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
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  Link,
} from '@chakra-ui/react';

import {
  useDeleteProjectMutation,
  useGetProjectIdQuery,
  useUpdateProjectMutation,
} from '../../API/ProjectAPI';
import ModalComponent from '../../components/ModalComponent';
import Spinner from '../../components/spinner';
import useForm from '../../Hooks/useForm';
import { isErrorWithMessage } from '../../utils/helpers';
import type { AlertState, IProject } from '../../interface';

type EditProjectType = Omit<IProject, 'roadMap' | '_id' | 'user'>;

const init: EditProjectType = {
  title: '',
  description: '',
  process: 5,
  github: '',
  live: false,
  website: '',
  technologies: [],
  date: '',
};

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
    skip: !id,
  });
  const { FormValues, ErrorsState, HandleChange, setFormValues } =
    useForm(init);
  const [DeleteProjectMutation, DeleteResult] = useDeleteProjectMutation();
  const [UpdateProjectMutation, UpdateResult] = useUpdateProjectMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const ProcessChange = (value: number | any) => {
    setFormValues((State: EditProjectType) => ({
      ...State,
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
        setFormValues((State: EditProjectType) => ({
          ...State,
          [key]: project[key as keyof EditProjectType],
        }));
      });
    }
  }, [project, setFormValues]);

  useEffect(() => {
    if (UpdateResult.isSuccess) {
      onClose();
    }
  }, [UpdateResult.isSuccess, onClose]);

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
    <Box>
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
          <FormControl isRequired isInvalid={!!ErrorsState.title}>
            {ErrorsState.title ? (
              <FormLabel color="red">{ErrorsState.title}</FormLabel>
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
          <FormControl isInvalid={!!ErrorsState.description} isRequired>
            {ErrorsState.description ? (
              <FormLabel color="red">{ErrorsState.description}</FormLabel>
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
            {ErrorsState.github ? (
              <FormLabel color="red">{ErrorsState.github}</FormLabel>
            ) : (
              <FormLabel htmlFor="Github">Github : </FormLabel>
            )}

            <Input
              name="github"
              id="Github"
              type="url"
              placeholder="Github Link"
              value={FormValues.github}
              onChange={HandleChange}
            />
          </FormControl>
          <FormControl>
            {ErrorsState.website ? (
              <FormLabel color="red">{ErrorsState.website}</FormLabel>
            ) : (
              <FormLabel htmlFor="Website">Website : </FormLabel>
            )}

            <Input
              name="Website"
              id="Website"
              disabled={!FormValues.live}
              placeholder="Website Link"
              value={FormValues.website}
              onChange={HandleChange}
            />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="Live" mb="0">
              Is Live?
            </FormLabel>
            <Switch
              id="Live"
              value={FormValues.live ? 1 : 0}
              onChange={(e) => {
                setFormValues({
                  ...FormValues,
                  live: e.target.checked,
                });
              }}
            />
          </FormControl>
          {project.github && (
            <Box mt={5}>
              <Text>
                <a href={project.github}>Github Link</a>
              </Text>
            </Box>
          )}
          <Button
            colorScheme="green"
            w="100%"
            variant="outline"
            onClick={onOpen}
            _hover={{
              bg: 'green',
              color: 'white',
            }}
          >
            <Link as={RouterLink} to={`/RoadMap/${id}`}>
              Edit RoadMap
            </Link>
          </Button>
          <Button type="submit" colorScheme="blue" variant="outline">
            Update Project
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

export default EditProject;
