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
  Heading,
  Icon,
  Progress,
  Text,
  Grid,
  GridItem,
  Link,
} from '@chakra-ui/react';
import { CheckIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Navigate, useParams, Link as RouterLink } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import invert from 'invert-color';
import { toast } from 'react-toastify';
import {
  useDeleteProjectMutation,
  useGetProjectIdQuery,
} from '../../API/ProjectAPI';
import type { IRoadMap } from '../../interface';
import Spinner from '../../components/spinner';
import RandomColor from '../../utils/RandomColor';
import ConfirmationModal from '../../components/ConfirmationModal';

function SingleProject() {
  const { id } = useParams<{ id: string }>();
  const {
    isFetching,
    isLoading,
    isError,
    data: project,
  } = useGetProjectIdQuery(id, {
    skip: !id,
  });

  const [DeleteProjectMutation, DeleteResult] = useDeleteProjectMutation();

  if (isFetching || isLoading) return <Spinner />;

  if (isError || !project) {
    return <div>No Project Found</div>;
  }

  if (DeleteResult.isSuccess) {
    return <Navigate to="/projects" />;
  }
  const ConfirmDelete = (e: any) => {
    e.preventDefault();
    const FormValues = e.target.elements;
    const { Confirm } = FormValues;

    if (Confirm.value === `${project.title} Confirm`) {
      DeleteProjectMutation(project._id);
    } else {
      toast.error('Please confirm the title');
    }
  };

  return (
    <Container maxW="900px" mb={10}>
      <Flex alignItems="flex-end" justifyContent="flex-end">
        <Button mt={5} as={RouterLink} to={`/Project/Sessions/${project._id}`}>
          Work Sessions
        </Button>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        my={5}
        border="4px solid grey"
        borderRadius={10}
        p={5}
      >
        <Heading>
          Title : <span>{project.title}</span>
        </Heading>
        <Text textAlign="right" fontSize="2xl">
          {format(parseISO(project.date), "yyyy-MM-dd'T'HH:mm")}
        </Text>
      </Flex>
      <Text
        fontSize="3xl"
        w="100%"
        border="4px solid grey"
        borderRadius={10}
        p={5}
      >
        <Text as="span" fontWeight="medium">
          Description :
        </Text>

        <Text as="span" fontSize="2xl" w="100px" px="2" lineHeight="1px">
          {project.description}
        </Text>
      </Text>
      <Heading as="h2" fontSize="2xl" my={5}>
        Technologies :
      </Heading>
      <Grid
        gap="10"
        templateColumns="repeat(auto-fit, minmax(150px, 1fr))"
        // direction={['column', 'row']}
        alignItems="center"
        w="100%"
        border="4px solid white"
        borderRadius={10}
        p={5}
      >
        {project.technologies.map((tech: any) => (
          <GridItem
            key={tech}
            p={2}
            bg={`${RandomColor()}`}
            fontSize={20}
            borderRadius={10}
            textAlign="center"
          >
            {tech}
          </GridItem>
        ))}
      </Grid>
      <Heading
        as="h3"
        fontSize="2xl"
        mt={5}
        borderBottom="4px solid white"
        py={5}
      >
        Deployed :
        <Text as="span" px={5}>
          {project.live ? (
            <Icon as={CheckIcon} fontSize="4xl" />
          ) : (
            <Text as="span" fontSize="1rem">
              Not Yet Deployed
            </Text>
          )}
        </Text>
      </Heading>
      {project.website && (
        <Flex gap={5} fontSize="3xl" borderBottom="4px solid white" py={5}>
          <span>Website : </span>
          <Link
            href={project.website}
            isExternal
            _hover={{
              textDecoration: 'none',
              color: '#fff',
              backgroundColor: '#000',
            }}
            display="flex"
            gap={5}
            px={5}
            borderRadius={10}
            justifyItems="center"
            alignItems="center"
          >
            Link <ExternalLinkIcon mx="2px" />
          </Link>
        </Flex>
      )}
      {project.github && (
        <Flex gap={5} fontSize="3xl" borderBottom="4px solid white" py={5}>
          <span>Github : </span>
          <Link
            href={project.github}
            isExternal
            _hover={{
              textDecoration: 'none',
              color: '#fff',
              backgroundColor: '#000',
            }}
            display="flex"
            gap={5}
            px={5}
            borderRadius={10}
            justifyItems="center"
            alignItems="center"
          >
            Github <ExternalLinkIcon mx="2px" />
          </Link>
        </Flex>
      )}
      {project.roadMap.length > 0 && (
        <Box justifyContent="space-between" alignItems="center" mt={5}>
          <Flex alignItems="center" my={5}>
            <Heading as="h3" fontSize="2xl">
              Road Map
            </Heading>
          </Flex>

          <Accordion allowToggle>
            {project.roadMap.map((road: IRoadMap) => (
              <AccordionItem key={road._id}>
                <AccordionButton>
                  <Text
                    key={road.name}
                    p={2}
                    bg={`${road.color ? road.color : RandomColor()}`}
                    color={`${road.color ? invert(road.color) : RandomColor()}`}
                    fontSize="1.5rem"
                    borderRadius={10}
                    width="100%"
                    textAlign={['left', 'center']}
                  >
                    {road.name.toUpperCase()}
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
                  </>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      )}
      <Container mt={5}>
        <Button
          as={RouterLink}
          to={`/EditProject/${project._id}`}
          colorScheme="blue"
          w="100%"
          p={5}
          variant="outline"
          _hover={{
            bg: 'blue',
            color: 'white',
          }}
        >
          Edit Project
        </Button>

        <ConfirmationModal
          OnSubmit={ConfirmDelete}
          Result={DeleteResult}
          Title={`${project.title}`}
        >
          <Button
            mt={5}
            colorScheme="red"
            w="100%"
            variant="outline"
            _hover={{
              bg: 'red',
              color: 'white',
            }}
          >
            Delete Project
          </Button>
        </ConfirmationModal>
      </Container>
    </Container>
  );
}

export default SingleProject;
