import { Box, Flex, Heading, Progress, Skeleton, Text } from '@chakra-ui/react';
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
      <Skeleton isLoaded={!isLoading} height="2rem">
        <Heading fontSize="2xl">DESCRIPTION: {Project?.description}</Heading>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} height="10rem">
        <Box bg="#333" mt={5} p={5} borderRadius={5}>
          <Text>
            Progress <span>{Project?.process} %</span>
          </Text>
          <Progress
            colorScheme="green"
            height="20px"
            size="sm"
            mt={4}
            data-testid={`progress-bar-${Project?._id}`}
            borderRadius="10px"
            value={Project?.process}
          />
        </Box>
      </Skeleton>
    </Flex>
  );
}

export default Project;
