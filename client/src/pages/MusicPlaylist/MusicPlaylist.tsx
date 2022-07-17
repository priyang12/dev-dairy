import { Box, Heading, Spinner, Flex, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import jsmediatags from '@priyang/jsmediatags';
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

const reorder = (lists: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(lists);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? 'blue' : 'transparent',
});

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

            SongsDB?.add('Songs', file, file.name);
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
            setSongs([...songs, file.name]);
          },
        });
      });
    }
  };

  const playSong = (song: string, index: number) => {
    dispatch(MusicSliceLoading(true));
    dispatch(setCurrentMusic(index));
  };

  const RemoveSong = (song: string, index: number) => {
    const transaction = SongsDB?.transaction(
      ['Songs', 'SongsInfo', 'SongsMeta'],
      'readwrite',
    );
    if (transaction) {
      transaction.objectStore('Songs').delete(song);
      transaction.objectStore('SongsInfo').delete(song);
      transaction.objectStore('SongsMeta').delete(song);
      transaction.oncomplete = (e) => {
        const NewList = songs.filter((s: string) => s !== song);
        setSongs(NewList);
        dispatch(setPlayList(NewList));
      };
      transaction.commit();
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
      height={['100%', '100%', '150vh']}
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
            <Box mt={5} className="card">
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
