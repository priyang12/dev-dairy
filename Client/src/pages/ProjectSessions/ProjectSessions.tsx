import { Box, Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProjectId } from '../../API/ProjectAPI';
import Container from '../../components/Container';
import Spinner from '../../components/spinner';
import { setProject } from '../../features/WorkSessionSlice';
import type { StoreState } from '../../store';
import { toDaysMinutesSeconds } from '../../utils/SecondsToFormate';
import {
  useDeleteAllProjectSessions,
  useGetSessionsByProject,
  usePullSessions,
} from '../../API/WorkSessionsAPI';
import { useApiToast } from '../../Hooks/useApiToast';
import MetaData from '../../Meta/MetaProjectSessions';

function ProjectSessions() {
  const { id } = useParams<{
    id: any;
  }>();

  const Dispatch = useDispatch();
  const { Project: SessionProject } = useSelector(
    (state: StoreState) => state.WorkSession,
  );
  const { data: Project, isLoading } = useGetProjectId(id);
  const { data: ProjectSession, isLoading: LoadingSessions } =
    useGetSessionsByProject(id);
  const [DeleteAllSessions, DeleteResult] = useDeleteAllProjectSessions();
  const [PullCall, PullResult] = usePullSessions();
  const [DeleteCheck, setDeleteCheck] = useState(false);
  const [DeleteList, setDeleteList] = useState<Set<string>>(new Set());

  useApiToast({
    Result: DeleteResult,
    successMessage: 'Session Deleted',
    SuccessType: 'error',
    loadingMessage: 'Deleting Session',
    ErrorMessage: 'Error Deleting Session',
  });

  useApiToast({
    Result: PullResult,
    SuccessType: 'warning',
    successMessage: 'Sessions Removed',
    loadingMessage: 'Deleting Sessions',
    ErrorMessage: 'Error Pulling Session',
  });

  const StartSession = () => {
    if (SessionProject.id) {
      toast.error('You are already in a session', {
        autoClose: 2000,
      });
    } else {
      toast.success(`WorkSession For ${Project?.title} is Loaded `, {
        autoClose: 2000,
      });
      Dispatch(
        setProject({
          id,
          name: Project?.title,
        }),
      );
    }
  };

  const RemoveLists = () => {
    PullCall({
      ProjectId: id,
      ArgSessions: DeleteList,
    });
    setDeleteCheck(false);
    setDeleteList(new Set());
  };

  if (isLoading || LoadingSessions) return <Spinner />;

  return (
    <Container my={5}>
      <MetaData />
      <Box className="glass" p={5}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          direction={['column', 'column', 'row', 'row']}
          gap={5}
          my={5}
        >
          <Heading>
            <span>{Project?.title}</span>
            <span>s</span>
            &nbsp;
            <Text as="span" fontSize="2xl">
              Work Sessions
            </Text>
          </Heading>

          {ProjectSession && ProjectSession?.session.length > 0 && (
            <Button
              alignSelf={['flex-start', 'center', 'flex-start', 'flex-start']}
              colorScheme="red"
              variant="outline"
              _hover={{
                bg: 'red',
                color: 'white',
              }}
              data-testid="delete-all-sessions"
              onClick={() => {
                DeleteAllSessions(id);
              }}
            >
              Delete All Sessions
            </Button>
          )}
        </Flex>

        <Heading fontSize="3xl">
          Total Time :&nbsp; <span>{ProjectSession?.Time}</span>
        </Heading>
        <Text fontSize="2xl">
          Total Sessions : &nbsp; <span>{ProjectSession?.session.length}</span>
        </Text>
      </Box>
      <Flex
        my={5}
        direction={['column', 'row', 'row']}
        gap={5}
        mx={5}
        justifyContent="space-between"
      >
        {!DeleteCheck ? (
          <>
            <Button onClick={StartSession} colorScheme="blue" variant="outline">
              Start Session
            </Button>

            <Button
              colorScheme="red"
              onClick={() => {
                setDeleteCheck(true);
              }}
            >
              Delete Session
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={RemoveLists}
              colorScheme="red"
              _hover={{
                bg: 'red',
                color: 'white',
              }}
            >
              Delete Selected Sessions
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              _hover={{
                bg: 'blue',
                color: 'white',
              }}
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
        {!DeleteResult.isLoading &&
          (ProjectSession && ProjectSession?.session.length > 0 ? (
            ProjectSession?.session.map((session) => (
              <Flex
                justifyContent="space-between"
                alignItems="center"
                p={5}
                className="glass"
                key={session._id}
              >
                <Heading fontSize="xl">
                  {toDaysMinutesSeconds(session.Time, 'hh:mm:ss')}
                </Heading>

                <Text>
                  {session.createdAt &&
                    format(parseISO(session.createdAt), 'yyyy-MM-dd')}
                </Text>
                {DeleteCheck &&
                  (!DeleteList.has(session._id) ? (
                    <IconButton
                      aria-label={`DeleteButton-${session._id}`}
                      _hover={{
                        color: '#fff',
                      }}
                      onClick={() => {
                        const NewList = new Set(DeleteList).add(session._id);
                        setDeleteList(NewList);
                      }}
                    >
                      <AiFillDelete />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label={`RemoveDeleteButton-${session._id}`}
                      _hover={{
                        color: '#fff',
                      }}
                      onClick={() => {
                        DeleteList.delete(session._id);
                        const NewList = new Set(DeleteList);
                        setDeleteList(NewList);
                      }}
                    >
                      <FcCancel />
                    </IconButton>
                  ))}
              </Flex>
            ))
          ) : (
            <Text fontSize="6xl" textAlign="center">
              No sessions yet
            </Text>
          ))}
      </Flex>
    </Container>
  );
}
export default ProjectSessions;
