import { Flex, IconButton, Text } from '@chakra-ui/react';
import { FaList } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';

const getItemStyle = (draggableStyle: any, isDragging: any) => ({
  background: isDragging ? 'red' : 'transparent',
  margin: `0 0 8px 0`,
  ...draggableStyle,
});

function MusicList({ songs, playSongFN, RemoveSong }: any) {
  return (
    <Flex direction="column" gap={1} h={['80vh', '100vh']} overflowY="scroll">
      {[...songs].map((song: string, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Draggable index={index} draggableId={song} key={`${song}-${index}`}>
          {(provided: any, snapshot: any) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="card"
              ref={provided.innerRef}
              style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Flex
                key={song}
                border="1px solid #fff"
                p={[2, 2, 2, 4]}
                gap={5}
                alignItems="center"
              >
                <FaList />
                <Text
                  cursor="pointer"
                  rounded="xl"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  w="100%"
                  p={['2', '5']}
                  transition="all 0.1s"
                  _hover={{
                    backgroundColor: '#fff',
                    color: '#000',
                  }}
                  onClick={() => {
                    playSongFN(song, index);
                  }}
                >
                  {song}
                </Text>
                <IconButton
                  icon={<MdDeleteForever />}
                  onClick={() => {
                    RemoveSong(song, index);
                  }}
                  aria-label="DeleteMusic"
                />
              </Flex>

              {provided.placeholder}
            </div>
          )}
        </Draggable>
      ))}
    </Flex>
  );
}

export default MusicList;
