import { HStack, Container, Progress, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useGetProjectsQuery } from '../API/ProjectAPI';
import ProjectCard from '../components/ProjectCard';
import type { IProject, ProjectState } from '../interface';

function Projects() {
  const { isLoading, isFetching } = useGetProjectsQuery('');
  const { projects }: ProjectState = useSelector((state: any) => state.Project);
  if (isLoading || isFetching) return <div>Loading...</div>;
  if (projects.length === 0) {
    return <div>No Projects</div>;
  }

  return (
    <div className="top">
      <Container maxW="800px">
        <Flex gap={10} direction="column">
          {projects.map((project: IProject) => (
            <ProjectCard Project={project} key={project._id} />
          ))}
        </Flex>
      </Container>
    </div>
  );
}

export default Projects;
