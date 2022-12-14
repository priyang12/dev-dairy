import { Flex, IconButton, Text } from '@chakra-ui/react';
import { FaList } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const getItemStyle = (draggableStyle: any, isDragging: any) => ({
  background: isDragging ? 'red' : 'transparent',
  margin: '0 0 8px 0',
  ...draggableStyle,
});

function MusicList({ songs, playSongFN, RemoveSong }: any) {
  return (
    <Flex
      direction="column"
      gap={1}
      maxH={['80vh', '100vh']}
      overflowY="scroll"
    >
      {[...songs].map((song: string, index) => (
        <Draggable index={index} draggableId={song} key={`${song}-${uuidv4()}`}>
          {(provided: any, snapshot: any) => (
            <div
              key={uuidv4()}
              className="glass"
              ref={provided.innerRef}
              style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Flex
                w="100%"
                minW={['50vw', '70vw']}
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
                    playSongFN(index);
                  }}
                >
                  {song}
                </Text>
                <IconButton
                  icon={<MdDeleteForever />}
                  onClick={() => {
                    RemoveSong(song);
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
