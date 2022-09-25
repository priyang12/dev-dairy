import { Button, Flex, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetProjects } from '../../API/ProjectAPI';
import ProjectCard from '../SingleProject/ProjectCard';
import Spinner from '../../components/spinner';
import Container from '../../components/Container';

function Projects() {
  const { isLoading, isFetching, data } = useGetProjects('');

  if (isLoading || isFetching) return <Spinner />;

  if (!data || data.length === 0) {
    return (
      <Container>
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
        <h1>No Projects</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Heading m={5} ml={0} textAlign="center">
        Total Projects {data.length}
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
        {data.map((project) => (
          <ProjectCard Project={project} key={project._id} />
        ))}
      </Flex>
    </Container>
  );
}

export default Projects;
