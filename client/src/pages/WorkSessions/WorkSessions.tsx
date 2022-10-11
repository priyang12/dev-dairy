import {
  Box,
  Stack,
  Text,
  Heading,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useGetSessions } from '../../API/WorkSessionsAPI';
import Container from '../../components/Container';
import Spinner from '../../components/spinner';
import DeleteWorkSessionModal from './DeleteWorkSessionModal';
import { toDaysMinutesSeconds } from '../../utils/SecondsToFormate';

function WorkSessions() {
  const { data, isLoading } = useGetSessions();

  if (isLoading) return <Spinner />;

  if (!data || data.length === 0) {
    return (
      <Container mt={5}>
        <Flex justifyContent="space-between" alignItems="center" p={5}>
          <Heading> No Work Sessions</Heading>
        </Flex>
      </Container>
    );
  }

  return (
    <Container mt={5}>
      <Flex justifyContent="space-between" alignItems="center" p={5}>
        <Heading>Work Sessions</Heading>
        <DeleteWorkSessionModal />
      </Flex>

      <Stack spacing={10} direction="column" my={5}>
        {data?.map((ProjectSession) => (
          <Box
            className="card"
            key={ProjectSession._id}
            shadow="md"
            borderWidth="1px"
            p={6}
            rounded="2xl"
          >
            <Flex
              to={`/Project/Sessions/${ProjectSession.project._id}`}
              as={Link}
              direction="column"
              gap={5}
              _hover={{ color: 'third.600' }}
            >
              <Heading as="h2" fontSize="2xl">
                Project : <span>{ProjectSession.project.title}</span>
              </Heading>
              <Text as="h3" fontSize="xl">
                Description : <span>{ProjectSession.project.description}</span>
              </Text>
            </Flex>
            {ProjectSession.session.length > 0 ? (
              <TableContainer mt={10}>
                <Table variant="simple">
                  <TableCaption fontSize="md">
                    Works Sessions : {ProjectSession.session.length}
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Session Time</Th>
                      <Th>Date</Th>
                    </Tr>
                  </Thead>

                  {ProjectSession.session.map((workSession) => (
                    <Tbody key={workSession._id}>
                      <Tr>
                        <Td>
                          <Heading fontSize="xl">
                            {toDaysMinutesSeconds(workSession.Time, 'hh:mm:ss')}
                          </Heading>
                        </Td>
                        <Td>
                          <Text>
                            {workSession.createdAt &&
                              format(
                                parseISO(workSession.createdAt),
                                'dd/MM/yyyy',
                              )}
                          </Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  ))}
                </Table>
              </TableContainer>
            ) : (
              <Text fontSize="8xl">No sessions yet</Text>
            )}
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
export default WorkSessions;
