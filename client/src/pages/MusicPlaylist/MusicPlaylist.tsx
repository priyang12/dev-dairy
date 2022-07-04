import {
  Box,
  Container,
  Text,
  Heading,
  Spinner,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropZone from 'react-dropzone';
import {
  setCurrentMusicInPlaylist,
  setLoading as MusicSliceLoading,
  setPlayList,
} from '../../features/MusicSlice';
import type { MusicState } from '../../features/MusicSlice';
import useSongsdb from '../../Hooks/useSongsdb';
import BgImage from '../../components/BgImage';
import MusicSymbol from '../../Assets/music.png';
import MusicPlayer from '../../components/MusicPlayer';

function MusicPlaylist() {
  const dispatch = useDispatch();
  const { SongsDB } = useSongsdb();
  const [songs, setSongs] = useState<any>([]);
  const { isLoading }: MusicState = useSelector((state: any) => state.Music);

  useEffect(() => {
    SongsDB?.getAllKeys('Songs').then((dbsongs: any) => {
      setSongs(dbsongs);
    });
  }, [SongsDB]);

  useEffect(() => {
    if (songs.length > 0) {
      dispatch(setPlayList(songs));
    }
  }, [dispatch, songs]);

  const onFileChange = (AcceptedFiles: any) => {
    if (AcceptedFiles) {
      AcceptedFiles.forEach((file: any) => {
        // Store as File for Now later on we will store as blob
        SongsDB?.add('Songs', file, file.name);
        setSongs([...songs, file.name]);
      });
      window.location.reload();
    }
  };

  const playSong = (name: string, index: number) => {
    dispatch(MusicSliceLoading(true));
    dispatch(setCurrentMusicInPlaylist(index));
  };

  return (
    <BgImage
      pt={10}
      BgImageData={{
        ImageFile: MusicSymbol,
      }}
    >
      <Box mx="auto" w="70vw" minW="350px">
        {isLoading && <Spinner />}
        <Flex
          direction={['column', 'column', 'column', 'row']}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex
            direction="column"
            w={['100%', '100%', 'fit-content']}
            className="card"
            rounded="2xl"
          >
            {songs.length === 0 && <Text>No Songs</Text>}
            <Heading py={5} textAlign="center">
              Music Playlist
            </Heading>
            <Container h="50vh" overflowY="scroll">
              {[...songs].map((song: string, index) => (
                <Text
                  key={song}
                  cursor="pointer"
                  my={5}
                  p={5}
                  border="1px solid #fff"
                  rounded="xl"
                  overflowY="scroll"
                  _hover={{
                    backgroundColor: '#fff',
                    color: '#000',
                  }}
                  onClick={() => {
                    playSong(song, index);
                  }}
                >
                  <Button bg="transparent" w="100%">
                    {song}
                  </Button>
                </Text>
              ))}
            </Container>
            <Box mt={5}>
              <DropZone
                onDrop={onFileChange}
                accept={{
                  'audio/mp3': ['.mp3'],
                  'audio/wav': ['.wav'],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box m={2}>
                    <Flex justifyContent="center" p={5} {...getRootProps()}>
                      <Box
                        as="input"
                        type="file"
                        bg="#333"
                        accept=".mp3"
                        placeholder="My Image"
                        multiple
                        {...getInputProps()}
                      />

                      <Button>
                        Drag n drop some files here, or click to select files
                      </Button>
                    </Flex>
                  </Box>
                )}
              </DropZone>
            </Box>
          </Flex>
          {/* <MusicPlayer /> */}
        </Flex>
      </Box>
    </BgImage>
  );
}

export default MusicPlaylist;
