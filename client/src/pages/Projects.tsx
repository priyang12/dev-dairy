import { HStack, Container, Progress, Flex } from '@chakra-ui/react';

import { useGetProjectsQuery } from '../API/ProjectAPI';
import ProjectCard from '../components/ProjectCard';
import type { IProject } from '../interface';

function Projects() {
  const { isLoading, isFetching, data } = useGetProjectsQuery('');

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (data.length === 0) {
    return <div className="top">No Projects</div>;
  }

  return (
    <div className="top">
      <Container maxW="800px">
        <Flex gap={10} direction="column">
          {data.map((project: IProject) => (
            <ProjectCard Project={project} key={project._id} />
          ))}
        </Flex>
      </Container>
    </div>
  );
}

export default Projects;
