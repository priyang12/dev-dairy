import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import useSongsdb from '../Hooks/useSongsdb';

function MusicPlayer() {
  const SongsDb = useSongsdb();
  const [SongFile, setSongFile] = useState<any>(null);

  useEffect(() => {
    const CurrentSong = localStorage.getItem('CurrentSong');
    if (CurrentSong) {
      SongsDb?.get('Songs', CurrentSong).then((song) => {
        const songUrl = URL.createObjectURL(song);
        setSongFile(songUrl);
        // setLoading(false);
      });
    }
  }, [SongsDb, setSongFile]);

  return (
    <Box
      w={['100%', '70%', '50%']}
      m="auto"
      display="flex"
      h="50px"
      position="fixed"
      top="30vh"
      right="-20vw"
      transition="all 0.5s ease-in-out"
      _hover={{
        transform: 'scale(1.1)',
        zIndex: '2',
      }}
    >
      {/* {imageSrc && (
        <Box w="100px">
          <Img src={imageSrc} alt="album" />
        </Box>
      )} */}
      <ReactPlayer
        width="inherit"
        height="inherit"
        url={SongFile}
        // url={SongFile}
        // onLoadedMetadata={(event: any) =>
        //   jsmediatags.read(event.target.src, {
        //     onSuccess: (tag: any) => {
        //       const { data } = tag.tags.picture;
        //       const { format } = tag.tags.picture;

        //       let base64String = '';

        //       data.forEach((byte: any) => {
        //         base64String += String.fromCharCode(byte);
        //       });

        //       setImgSrc(
        //         `data:image/${format};base64,${window.btoa(base64String)}`,
        //       );
        //     },
        //   })
        // }
        controls
      />
    </Box>
  );
}

export default MusicPlayer;
