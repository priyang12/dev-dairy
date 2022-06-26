// import jsmediatags from 'jsmediatags/dist/jsmediatags.min.js';
import {
  Box,
  Container,
  Text,
  Input,
  Heading,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/file';
import useMakeDB from '../../Hooks/useMakeDB';
import Navlayout from '../../layout/Navlayout';

function MusicPlaylist() {
  const { SongsDB, Loading: DataBaseLoading } = useMakeDB();

  const [songs, setSongs] = useState<any>([]);
  const [Loading, setLoading] = useState(false);
  const [SongFile, setSongFile] = useState<string>('');

  useEffect(() => {
    SongsDB?.getAllKeys('Songs').then((dbsongs: any) => {
      setSongs(dbsongs);
    });
  }, [SongsDB]);

  const onFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const songUrl = URL.createObjectURL(file);
      setSongFile(songUrl);
      // Store as Url for Now later on we will store as blob
      SongsDB?.add('Songs', file, file.name);
      setSongs([...songs, file.name]);
    }
  };

  const playSong = (name: string) => {
    setLoading(true);
    localStorage.setItem('CurrentSong', name);
    window.location.reload();
    // SongsDB?.get('Songs', name).then((song) => {
    //   const songUrl = URL.createObjectURL(song);
    //   localStorage.setItem('songUrl', songUrl);
    //   setSongFile(songUrl);
    //   setLoading(false);
    // });
  };

  return (
    <Navlayout>
      <Container>
        {Loading && <Spinner />}
        {songs.length === 0 && <Text>No Songs</Text>}
        <Heading p={5}>Music Player</Heading>
        {songs.map((song: string) => (
          <Text
            key={song}
            cursor="pointer"
            my={5}
            onClick={() => {
              playSong(song);
            }}
          >
            {song}
          </Text>
        ))}
        <Box mt={5}>
          <Input
            type="file"
            bg="#333"
            accept=".mp3"
            placeholder="My Image"
            onChange={onFileChange}
          />
        </Box>
      </Container>
    </Navlayout>
  );
}

export default MusicPlaylist;
