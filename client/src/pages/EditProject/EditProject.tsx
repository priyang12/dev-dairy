import type { FormEvent } from 'react';
import { useLayoutEffect } from 'react';
import { Link as RouterLink, useParams, Navigate } from 'react-router-dom';
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
  Textarea,
  Link,
} from '@chakra-ui/react';
import {
  useGetProjectIdQuery,
  useUpdateProjectMutation,
} from '../../API/ProjectAPI';
import Spinner from '../../components/spinner';
import useForm from '../../Hooks/useForm';
import type { IProject } from '../../interface';
import { useApiToast } from '../../Hooks/useApiToast';
import { CheckError } from '../../utils/helpers';

type EditProjectFrom = Omit<IProject, 'roadMap' | '_id' | 'user'>;

const init: EditProjectFrom = {
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

  const [UpdateProjectMutation, UpdateResult] = useUpdateProjectMutation();

  useApiToast({
    Result: UpdateResult,
    loadingMessage: 'Updating Project',
    successMessage: 'Project Updated Successfully',
  });

  const ProcessChange = (value: number | any) => {
    setFormValues((State: EditProjectFrom) => ({
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
        setFormValues((State: EditProjectFrom) => ({
          ...State,
          [key]: project[key as keyof EditProjectFrom],
        }));
      });
    }
  }, [project, setFormValues]);

  if (isFetching || isLoading) return <Spinner />;

  if (UpdateResult.isSuccess) return <Navigate to={`/Projects/${id}`} />;

  if (isError) {
    return (
      <Container maxW="800px" mb={10} mt={10}>
        <Alert
          my={5}
          borderRadius={10}
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            <strong>{CheckError(error)}</strong>
          </AlertTitle>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="800px" mb={10} mt={10}>
      <Flex justifyContent="space-between">
        <Heading as="h1" size="lg" mb={4}>
          Edit Project
        </Heading>
        <Button
          colorScheme="green"
          variant="outline"
          _hover={{
            bg: 'green',
            color: 'white',
          }}
        >
          <Link as={RouterLink} to={`/RoadMap/${id}`}>
            Edit RoadMap
          </Link>
        </Button>
      </Flex>
      <Flex
        w="100%"
        as="form"
        direction="column"
        gap={5}
        onSubmit={UpdateProject}
      >
        <FormControl isInvalid={!!ErrorsState.title} isRequired>
          {ErrorsState.title ? (
            <FormLabel color="red">{ErrorsState.title}</FormLabel>
          ) : (
            <FormLabel htmlFor="title">Title : </FormLabel>
          )}

          <Input
            id="title"
            name="title"
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
            <FormLabel htmlFor="description">Description : </FormLabel>
          )}

          <Textarea
            id="description"
            name="description"
            placeholder="Project Description"
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
          <FormLabel htmlFor="process">Process</FormLabel>
          <NumberInput
            maxW="100px"
            mr="2rem"
            id="process"
            name="process"
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
            <FormLabel htmlFor="github">Github : </FormLabel>
          )}

          <Input
            name="github"
            id="github"
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
            <FormLabel htmlFor="website">Website : </FormLabel>
          )}

          <Input
            name="website"
            id="website"
            disabled={!FormValues.live}
            placeholder="Website Link"
            value={FormValues.website}
            onChange={HandleChange}
          />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="live" mb="0">
            Is Live?
          </FormLabel>
          <Switch
            id="live"
            value={FormValues.live ? 1 : 0}
            onChange={(e) => {
              setFormValues({
                ...FormValues,
                live: e.target.checked,
              });
            }}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" variant="outline">
          Update Project
        </Button>
      </Flex>
    </Container>
  );
}

export default EditProject;
