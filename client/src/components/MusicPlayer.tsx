import {
  Box,
  Button,
  Flex,
  IconButton,
  Img,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  FaBackward,
  FaForward,
  FaMusic,
  FaPause,
  FaPlay,
} from 'react-icons/fa';

import { AiOutlineCloseCircle } from 'react-icons/ai';

import { GoMute, GoUnmute } from 'react-icons/go';
import { useEffect, useRef, useState, Profiler, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player/file';
import Draggable from 'react-draggable';
import {
  setCurrentMusicInPlaylist,
  setLoading as MusicLoading,
} from '../features/MusicSlice';
import useSongsdb from '../Hooks/useSongsdb';
import MusicSymbol from '../Assets/music.png';
import type { MusicState } from '../features/MusicSlice';

function MusicPlayer() {
  const { SongsDB } = useSongsdb();
  const { CurrentMusicInPlaylist, PlayList }: MusicState = useSelector(
    (state: any) => state.Music,
  );
  const dispatch = useDispatch();
  const MusicPlayerRef = useRef<any>(null);
  const [ClosePlayer, setClosePlayer] = useState<boolean>(false);
  const [Hidden, setHidden] = useState(false);
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  const [Playing, setPlaying] = useState(false);
  const [Start, setStart] = useState({
    y: 0,
    x: 0,
  });
  const [Duration, setDuration] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [Mute, setMute] = useState(false);
  const [ProgressStates, setProgressStates] = useState(0);
  const [SongFile, setSongFile] = useState<any>(null);

  useEffect(() => {
    if (CurrentMusicInPlaylist) {
      try {
        SongsDB?.get('Songs', PlayList[CurrentMusicInPlaylist]).then((song) => {
          const songUrl = URL.createObjectURL(song);
          setSongFile(songUrl);
        });
      } catch (error) {
        console.log('error', error);
      } finally {
        dispatch(MusicLoading(false));
      }
    }
  }, [CurrentMusicInPlaylist, PlayList, SongsDB, dispatch]);

  const Toggle = () => {
    setPlaying((prev) => !prev);
  };
  function Render(phase: any, actualDuration: any, interactions: any) {
    console.log('phase', phase);
    console.log('actualDuration', actualDuration);
    console.log('interactions', interactions);
  }
  return (
    <Draggable defaultPosition={{ x: 1000, y: 0 }} grid={[25, 25]}>
      <Box position="fixed" zIndex={200}>
        {!ClosePlayer ? (
          <Box
            mt={20}
            bg="transparent"
            className="card"
            w={Hidden ? '0px' : '250px'}
            p={5}
            shadow={4}
            rounded="3xl"
            boxShadow="0px 0px 10px #fff"
            transition="all 0.5s ease-in-out"
          >
            <IconButton
              position="absolute"
              right="0"
              top="0"
              bg="#333"
              aria-label="MusicButton"
              rounded="3xl"
              onClick={() => {
                setHidden((prev) => !prev);
              }}
            >
              <FaMusic />
            </IconButton>

            <Box display={Hidden ? 'none' : 'block'}>
              <IconButton
                bg="#333"
                aria-label="MusicCloseButton"
                _hover={{
                  bg: 'red',
                }}
                onClick={() => {
                  setPlaying(false);
                  setClosePlayer((prev) => !prev);
                }}
              >
                <AiOutlineCloseCircle />
              </IconButton>
              <Img src={MusicSymbol} alt="album" rounded="3xl" my={5} />
              {CurrentMusicInPlaylist > 0 && (
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  color="white"
                  textAlign="center"
                  pb={2}
                >
                  Playing {PlayList[CurrentMusicInPlaylist]}
                </Text>
              )}

              <Flex id="Controllers" w="100%" justifyContent="space-around">
                <IconButton
                  bg="transparent"
                  icon={<FaBackward />}
                  aria-label="Music"
                  onClick={() => {
                    dispatch(
                      setCurrentMusicInPlaylist(CurrentMusicInPlaylist - 1),
                    );
                  }}
                />
                {!Playing ? (
                  <IconButton
                    bg="transparent"
                    aria-label="Play"
                    icon={<FaPlay />}
                    onClick={Toggle}
                    rounded="3xl"
                  />
                ) : (
                  <IconButton
                    bg="transparent"
                    aria-label="Pause"
                    icon={<FaPause />}
                    onClick={Toggle}
                  />
                )}
                <IconButton
                  icon={<FaForward />}
                  aria-label="Music"
                  bg="transparent"
                  onClick={() => {
                    dispatch(
                      setCurrentMusicInPlaylist(CurrentMusicInPlaylist + 1),
                    );
                  }}
                />
              </Flex>

              <Flex justifyContent="space-between" mx={2} mt={5}>
                <Text>
                  {Start.x}: {Start.y}
                </Text>
                <Flex justifyContent="center">
                  {Mute ? (
                    <IconButton
                      icon={<GoMute />}
                      aria-label="Mute"
                      onClick={() => {
                        setMute((prev) => !prev);
                      }}
                    />
                  ) : (
                    <IconButton
                      icon={<GoUnmute />}
                      aria-label="Mute"
                      onClick={() => {
                        setMute((prev) => !prev);
                      }}
                    />
                  )}
                </Flex>
                <Text>
                  {Duration.minutes}: {Duration.seconds}
                </Text>
              </Flex>
              {/* Need TO Fix Auto Focus  */}
              <Slider
                id="slider"
                value={ProgressStates}
                min={0}
                max={100}
                colorScheme="teal"
                onChange={(v) => setSliderValue(v)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="transparent"
                  color="white"
                  placement="top"
                  isOpen={showTooltip}
                  label={`${sliderValue}%`}
                >
                  <SliderThumb boxSize={6}>
                    <Box color="tomato" as={FaMusic} />
                  </SliderThumb>
                </Tooltip>
              </Slider>
            </Box>

            <ReactPlayer
              ref={MusicPlayerRef}
              muted={Mute}
              width="0"
              height="0"
              url={SongFile}
              progressInterval={1000}
              onDuration={(duration) => {
                setDuration({
                  minutes: Math.floor(duration / 60),
                  seconds: Math.floor(duration % 60),
                });
              }}
              onProgress={(progress) => {
                setStart({
                  x: Math.floor(progress.playedSeconds / 60),
                  y: Math.floor(progress.playedSeconds % 60),
                });

                setProgressStates(Math.round(progress.played * 100));
              }}
              playing={Playing}
            />
          </Box>
        ) : (
          <Box>
            <Button
              onClick={() => {
                setClosePlayer(false);
              }}
            >
              Show Player
            </Button>
          </Box>
        )}
      </Box>
    </Draggable>
  );
}

export default MusicPlayer;
