import { Button, Flex, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetProjects } from '../../API/ProjectAPI';
import ProjectCard from './ProjectCard';
import Spinner from '../../components/spinner';
import Container from '../../components/Container';
import MetaData from '../../Meta/MetaProjects';

function CreateProjectButton() {
  return (
    <Button
      to="/NewProject"
      w="50%"
      colorScheme="blue"
      my={5}
      h={50}
      as={RouterLink}
      textAlign="center"
      fontSize="1.5rem"
      fontWeight="bold"
    >
      New Project
    </Button>
  );
}

function Projects() {
  const { isLoading, isFetching, data } = useGetProjects('');

  if (isLoading || isFetching) return <Spinner />;

  if (data && data.length === 0) {
    return (
      <Container my="xl">
        <MetaData />
        <CreateProjectButton />
        <Heading fontSize="9xl">No Projects</Heading>
      </Container>
    );
  }

  return (
    <>
      <MetaData title={`Projects • ${data?.length}`} />
      <Container>
        <Heading m={5} ml={0} textAlign="center">
          Total Projects {data?.length}
        </Heading>
        <Button
          to="/NewProject"
          w="100%"
          colorScheme="blue"
          my={5}
          h={50}
          as={RouterLink}
          textAlign="center"
          fontSize="1.5rem"
          fontWeight="bold"
        >
          New Project
        </Button>

        <Flex gap={10} direction="column">
          {data?.map((project) => (
            <ProjectCard Project={project} key={project._id} />
          ))}
        </Flex>
      </Container>
    </>
  );
}

export default Projects;
