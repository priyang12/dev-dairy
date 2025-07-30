import { Box, Heading, Spinner, Flex, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
// @ts-ignore place this with music-metadata.
import jsmediatags from 'jsmediatags/dist/jsmediatags.min';
import DropZone from 'react-dropzone';
import useSongsdb from '../../Hooks/useSongsdb';
import BgImage from '../../components/BgImage';
import MusicSymbol from '../../Assets/Music.webp';
import MusicList from './MusicList';
import {
  setCurrentMusic,
  setLoading as MusicSliceLoading,
  setPlayList,
} from '../../features/MusicSlice';
import type { MusicState } from '../../features/MusicSlice';
import MetaData from '../../Meta/MetaMusicPlaylist';

const reorder = (lists: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(lists);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const getListStyle = (isDraggingOver: any) => ({
  // background: isDraggingOver ? 'blue' : 'transparent',
});

function MusicPlaylist() {
  const dispatch = useDispatch();
  const { SongsDB } = useSongsdb();
  const [songs, setSongs] = useState<any>([]);
  const [AddingNewSongs, setAddingNewSongs] = useState(false);
  const { isLoading, CurrentMusic, PlayList }: MusicState = useSelector(
    (state: any) => state.Music,
  );

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

  const onFileChange = async (AcceptedFiles: any) => {
    if (AcceptedFiles) {
      setAddingNewSongs(true);
      AcceptedFiles.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const data = e.target.result;

          SongsDB?.add(
            'Songs',
            new Blob([data], { type: file.type }),
            file.name,
          );
        };
        reader.readAsArrayBuffer(file);
        setSongs([...songs, file.name]);
        jsmediatags.read(file, {
          onSuccess: async (tag: any) => {
            const { tags } = tag;
            const { title, artist, album, year, picture } = tags;
            if (picture) {
              const { data } = picture;
              const ImageBlob = new Blob([new Uint8Array(data).buffer]);
              SongsDB?.add('SongsMeta', ImageBlob, file.name);
            } else {
              const ImageBlob = null;
              SongsDB?.add('SongsMeta', ImageBlob, file.name);
            }
            SongsDB?.add(
              'SongsInfo',
              {
                title,
                artist,
                album,
                year,
              },
              file.name,
            );
          },
        });
      });
      setAddingNewSongs(false);
    }
  };

  const playSong = (index: number) => {
    dispatch(MusicSliceLoading(true));
    dispatch(setCurrentMusic(index));
  };

  const RemoveSong = (song: string) => {
    const transaction = SongsDB?.transaction(
      ['Songs', 'SongsInfo', 'SongsMeta'],
      'readwrite',
    );
    if (transaction) {
      transaction.objectStore('Songs').delete(song);
      transaction.objectStore('SongsInfo').delete(song);
      transaction.objectStore('SongsMeta').delete(song);
      transaction.oncomplete = () => {
        const NewList = songs.filter((s: string) => s !== song);
        setSongs(NewList);
        dispatch(setPlayList(NewList));
      };
      transaction.commit();
      toast.success('Song Removed', {
        autoClose: 2000,
      });
    }
  };
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const NewSongs = reorder(
      songs,
      result.source.index,
      result.destination.index,
    );
    setSongs(NewSongs);
  };

  return (
    <BgImage
      minH={['100%', '80vh', '120vh']}
      pt={10}
      BgImageData={{
        ImageFile: MusicSymbol,
      }}
    >
      <MetaData
        title={`Music Playlist ${
          CurrentMusic > 0 ? `Playing ${PlayList[CurrentMusic]}` : ''
        }`}
      />
      <Box mx="auto" w="70vw" minW="350px">
        {(isLoading || AddingNewSongs) && <Spinner />}
        <Flex
          direction={['column', 'column', 'column', 'row']}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex
            direction="column"
            w={['100%', '100%', 'fit-content']}
            rounded="2xl"
          >
            <Heading py={5} textAlign="center">
              Music Playlist
            </Heading>
            {songs.length > 0 ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      <MusicList
                        songs={songs}
                        playSongFN={playSong}
                        RemoveSong={RemoveSong}
                      />
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <Box textAlign="center" p={5}>
                <Heading>No Songs Why Not Put some Below</Heading>
              </Box>
            )}
            <Box mt={5} className="glass">
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
                      <Button w="fit-content">Drop Your Music Here</Button>
                    </Flex>
                  </Box>
                )}
              </DropZone>
            </Box>
          </Flex>
          {/* Divider */}
        </Flex>
      </Box>
    </BgImage>
  );
}

export default MusicPlaylist;
