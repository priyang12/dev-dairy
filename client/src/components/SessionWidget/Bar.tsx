import { Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { ButtonGroup, Button } from '@priyang/react-component-lib';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePushSession } from '../../API/WorkSessionsAPI';
import { setProject } from '../../features/WorkSessionSlice';
import { useTimer } from '../../Hooks/useTimer';
import { ReducerState } from '../../store';
import Container from '../Container';

function Bar({ setDisplay }: { setDisplay: (State: boolean) => void }) {
  const Dispatch = useDispatch();
  const { Project } = useSelector((state: ReducerState) => state.WorkSession);
  const [PushCall, PushResult] = usePushSession();

  const {
    Initialized,
    Start,
    seconds,
    Minute,
    Hour,
    resetTimer,
    stopTimer,
    startTimer,
    CountTotalTime,
  } = useTimer(0);

  useEffect(() => {
    if (PushResult.isSuccess) {
      resetTimer();
      setDisplay(false);
    }
  }, [PushResult]);

  if (!Project.id) {
    return (
      <Container>
        <Heading textAlign="center" p={5}>
          No Project Selected
        </Heading>
      </Container>
    );
  }
  const PushNewSession = () => {
    PushCall({
      ProjectId: Project.id,
      session: { Time: CountTotalTime() },
    });
  };
  const RemoveSession = () => {
    Dispatch(
      setProject({
        id: '',
        name: '',
      }),
    );
  };
  return (
    <Container MW="1200px">
      <Grid
        p={5}
        gap={5}
        templateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
        justifyContent="center"
      >
        {PushResult.isLoading && <Text>Creating new session...</Text>}
        <GridItem
          px={5}
          bg="primary.800"
          rounded="2xl"
          rowSpan={[1, 1, 2, 2, 2]}
        >
          <Text fontSize="4xl" w={['200px', '300px', '500px']}>
            Hour : {Hour} Minute : {Minute} Second : {seconds}
          </Text>
          <Button onClick={RemoveSession}>Remove</Button>
        </GridItem>
        <GridItem>
          <ButtonGroup className="primary-border" bg="secondary.300">
            <Button onClick={startTimer}>Start</Button>
            <Button variant="primary-border" onClick={stopTimer}>
              Stop
            </Button>
            <Button onClick={resetTimer}>Reset</Button>
          </ButtonGroup>
        </GridItem>
        <GridItem>
          <Text fontSize="3xl">Project : {Project.name}</Text>

          {Start && (
            <Button variant="secondary-border" onClick={PushNewSession}>
              Add Session
            </Button>
          )}
          {!Initialized ? (
            <Text>Start The Timer</Text>
          ) : (
            <Text>Stop the timer to add a new session </Text>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
}

export default Bar;
