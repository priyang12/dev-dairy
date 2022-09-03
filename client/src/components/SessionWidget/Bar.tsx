import { Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { ButtonGroup, Button } from '@priyang/react-component-lib';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePageVisibility } from 'react-page-visibility';
import { usePushSession } from '../../API/WorkSessionsAPI';
import { setProject } from '../../features/WorkSessionSlice';
import { useApiToast } from '../../Hooks/useApiToast';
import { useTimer } from '../../Hooks/useTimer';
import { StoreState } from '../../store';
import Container from '../Container';
import { toDaysMinutesSeconds } from '../../utils/SecondsToFormate';

function Bar() {
  const Dispatch = useDispatch();
  const isVisible = usePageVisibility();
  const [StartSessionTime, setStartSessionTime] = useState<Date | null>(null);
  const { Project } = useSelector((state: StoreState) => state.WorkSession);
  const [PushCall, PushResult] = usePushSession();
  useApiToast({
    Result: PushResult,
    successMessage: 'Session Created',
    ErrorMessage: 'Error Creating Session',
  });

  const {
    Initialized,
    Start,
    seconds,
    Minute,
    Hour,
    setTimesFunction,
    resetTimer,
    stopTimer,
    startTimer,
    CountTotalTime,
  } = useTimer(0);

  useEffect(() => {
    if (document.visibilityState === 'hidden' || document.hidden === true)
      stopTimer();
    else if (StartSessionTime) {
      // @ts-ignore
      const elapsed = new Date() - (StartSessionTime as number);
      if (elapsed > 1000) {
        const TotalSeconds = Math.floor(elapsed / 1000);
        // Need to Implement Function Overload.
        setTimesFunction(toDaysMinutesSeconds(TotalSeconds) as any);
        startTimer();
      }
    }
  }, [document.visibilityState, document.hidden, isVisible]);

  useEffect(() => {
    if (PushResult.isSuccess) {
      resetTimer();
    }
  }, [PushResult]);

  const StartSession = () => {
    startTimer();
    if (!StartSessionTime) setStartSessionTime(new Date());
  };
  const StopSession = () => {
    stopTimer();
  };
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

  const RestSession = () => {
    resetTimer();
    setStartSessionTime(null);
  };

  if (!Project.id) {
    return (
      <Container>
        <Heading textAlign="center" p={5}>
          No Project Selected
        </Heading>
      </Container>
    );
  }

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
          bg="primary.800"
          rounded="2xl"
          rowSpan={[1, 1, 2, 2, 2]}
          order={[3, 3, 1]}
        >
          <Text fontSize="4xl" w={['200px', '300px', '500px']}>
            Hour : {Hour} Minute : {Minute} Second : {seconds}
          </Text>

          {Start ||
            (seconds > 0 && (
              <Button variant="success" mr={5} onClick={PushNewSession}>
                Add Session
              </Button>
            ))}
          <Button onClick={RemoveSession}>Remove</Button>
        </GridItem>
        <GridItem order={[2, 2]}>
          <ButtonGroup className="primary-border" bg="secondary.300">
            <Button onClick={StartSession}>Start</Button>
            <Button variant="primary-border" onClick={StopSession}>
              Stop
            </Button>
            <Button onClick={RestSession}>Reset</Button>
          </ButtonGroup>
        </GridItem>
        <GridItem order={[1, 1, 3]}>
          <Text fontSize="3xl">Project : {Project.name}</Text>

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
