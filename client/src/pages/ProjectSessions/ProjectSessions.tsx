import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { useGetProjectIdQuery } from '../../API/ProjectAPI';
import {
  useDeleteAllProjectSessions,
  useGetSessionsByProject,
  usePullSessions,
  usePushSession,
} from '../../API/WorkSessionsAPI';
import Container from '../../components/Container';
import Spinner from '../../components/spinner';

function ProjectSessions() {
  const { id } = useParams<{
    id: any;
  }>();
  const {
    data: Project,
    isLoading,
    isFetching,
  } = useGetProjectIdQuery(id);
  const { data: ProjectSession } = useGetSessionsByProject(id);
  const [DeleteMutate, DeleteResult] = useDeleteAllProjectSessions();
  const [PushCall, PushResult] = usePushSession();
  const [PullCall, PullResult] = usePullSessions();
  const [DeleteCheck, setDeleteCheck] = useState(false);
  const [DeleteList, setDeleteList] = useState<Set<string>>(
    new Set(),
  );

  const PushNewSession = () => {
    PushCall({
      ProjectId: id,
      session: { Time: 5000 },
    });
  };

  const RemoveLists = () => {
    PullCall({
      ProjectId: id,
      ArgSessions: DeleteList,
    });
    setDeleteCheck(false);
    setDeleteList(new Set());
  };

  if (isLoading || isFetching) return <Spinner />;

  if (!ProjectSession) return null;

  return (
    <Container mt={10}>
      {PushResult.isLoading && <Text>Creating new session...</Text>}
      <Flex mt={10} justifyContent="space-around">
        <h1>
          {Project?.title}
          {' '}
          Work Sessions
        </h1>
        {ProjectSession?.session.length > 0 && (
          <Button
            onClick={() => {
              DeleteMutate(id);
            }}
          >
            Delete All Sessions
          </Button>
        )}
      </Flex>

      <Text>
        Total Time :
        {ProjectSession?.Time}
      </Text>
      <Text>
        Total Sessions :
        {ProjectSession?.session.length}
      </Text>
      {PullResult.isLoading && <Text>Deleting sessions...</Text>}
      <Flex justifyContent="space-around" my={5}>
        {!DeleteCheck ? (
          <>
            <Button>Start Session</Button>
            <Button onClick={PushNewSession}>Add Session</Button>
            <Button
              onClick={() => {
                setDeleteCheck(true);
              }}
            >
              Delete Session
            </Button>
          </>
        ) : (
          <>
            <Button onClick={RemoveLists}>
              Delete Selected Sessions
            </Button>
            <Button
              onClick={() => {
                setDeleteList(new Set());
                setDeleteCheck(false);
              }}
            >
              Cancel Delete
            </Button>
          </>
        )}
      </Flex>

      {DeleteResult.isLoading && (
        <Box>Please wait while we delete all sessions</Box>
      )}
      <Flex direction="column" gap={5}>
        {!DeleteResult.isLoading
          && (ProjectSession?.session.length > 0 ? (
            ProjectSession?.session.map((session) => (
              <Flex
                justifyContent="space-between"
                p={5}
                bg={DeleteList.has(session._id) ? 'red' : '#333'}
                key={session._id}
              >
                <h2>{session.Time}</h2>
                <Text>
                  {format(parseISO(session.createdAt), 'yyyy-MM-dd')}
                </Text>
                {DeleteCheck && (
                  <IconButton
                    aria-label="DeleteButton"
                    _hover={{
                      backgroundColor: 'red',
                      color: '#fff',
                    }}
                    onClick={() => {
                      const NewList = new Set(DeleteList).add(
                        session._id,
                      );
                      setDeleteList(NewList);
                    }}
                  >
                    <AiFillDelete />
                  </IconButton>
                )}
              </Flex>
            ))
          ) : (
            <Text>No sessions yet</Text>
          ))}
      </Flex>
    </Container>
  );
}
export default ProjectSessions;
