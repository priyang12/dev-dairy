import {
  Box,
  Stack,
  Container,
  Text,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { useGetSessionsQuery } from '../../API/WorkSessionsAPI';
import Spinner from '../../components/spinner';
import DeleteWorkSessionModal from './DeleteWorkSessionModal';

function WorkSessions() {
  const { data, isLoading } = useGetSessionsQuery();
  if (isLoading) return <Spinner />;
  return (
    <Container mt={5}>
      <Flex justifyContent="space-between" p={5}>
        <Heading>Work Sessions</Heading>
        <DeleteWorkSessionModal />
      </Flex>

      <Stack spacing={10} direction="column">
        {data?.map((ProjectSession) => (
          <Box key={ProjectSession._id} shadow="md" borderWidth="1px" p={6}>
            <h3>Project : {ProjectSession.project.title}</h3>
            <h3>Description : {ProjectSession.project.description}</h3>
            {ProjectSession.session.length > 0 ? (
              ProjectSession.session.map((session) => (
                <div key={session._id}>
                  <h2>{session.Time}</h2>
                  <Text>
                    {format(parseISO(session.createdAt), 'yyyy-MM-dd')}
                  </Text>
                </div>
              ))
            ) : (
              <Text>No sessions yet</Text>
            )}
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
export default WorkSessions;
