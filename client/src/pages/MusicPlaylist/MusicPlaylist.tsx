import {
  Box,
  Container,
  Text,
  Input,
  Heading,
  Spinner,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { MusicState } from '../../features/MusicSlice';
import {
  setCurrentMusicKey,
  setLoading as MusicSliceLoading,
} from '../../features/MusicSlice';
import useSongsdb from '../../Hooks/useSongsdb';
import MusicSymbol from '../../Assets/music.png';
import BgImage from '../../components/BgImage';

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

  const onFileChange = (e: any) => {
    const files = Array.from(e.target.files) as [] | null;
    if (files) {
      files.forEach((file: any) => {
        // Store as File for Now later on we will store as blob
        SongsDB?.add('Songs', file, file.name);
        setSongs([...songs, file.name]);
      });
      window.location.reload();
    }
  };
  console.log('songs', songs.length);
  const playSong = (name: string) => {
    dispatch(MusicSliceLoading(true));
    dispatch(setCurrentMusicKey(name));
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
              Music Player
            </Heading>
            <Container h="50vh" overflowY="scroll">
              {[...songs].map((song: string) => (
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
                    playSong(song);
                  }}
                >
                  <Button bg="transparent" w="100%">
                    {song}
                  </Button>
                </Text>
              ))}
            </Container>
            <Box mt={5}>
              <Input
                type="file"
                bg="#333"
                accept=".mp3"
                placeholder="My Image"
                onChange={onFileChange}
                multiple
              />
            </Box>
          </Flex>
          <div>Music Player</div>
        </Flex>
      </Box>
    </BgImage>
  );
}

export default MusicPlaylist;
