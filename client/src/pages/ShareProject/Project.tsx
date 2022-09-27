import { Box, Flex, Heading, Skeleton } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetProjectId } from '../../API/ProjectAPI';
import { CheckError } from '../../utils/helpers';

function Project() {
  const { id } = useParams<{ id: string }>();
  const {
    data: Project,
    isLoading,
    isError,
    error: Error,
  } = useGetProjectId(id);

  if (isError) {
    const ErrorMessage = CheckError(Error);
    return <div>{ErrorMessage}</div>;
  }

  return (
    <Flex flexDir="column" gap="lg" my="lg">
      <Skeleton isLoaded={!isLoading} height="2rem">
        <Heading fontSize="2xl">TITLE: {Project?.title}</Heading>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} height="10rem">
        <Heading fontSize="2xl">DESCRIPTION: {Project?.description}</Heading>
      </Skeleton>
    </Flex>
  );
}

export default Project;
