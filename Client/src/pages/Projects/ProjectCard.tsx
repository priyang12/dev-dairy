import { Box, Button, Flex, Heading, Progress, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import RandomColor from '../../utils/RandomColor';
import type { IProject } from '../../interface';
import { assert, secondary, space } from '../../Theme';

function ProjectCard({ Project }: { Project: IProject }) {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderColor={assert[600]}
      width="100%"
    >
      <Heading fontSize={space.xl}>{Project.title}</Heading>
      <Text mt={4} fontSize={space.lg}>
        {Project.description}
      </Text>

      <Flex gap={['4', '5', '10']} mt={5} direction={['column', 'row']}>
        {Project.technologies.map((tech) => (
          <Text
            key={tech}
            data-testid={`${tech}-${Project._id}`}
            p={2}
            bg={`${RandomColor()}`}
            fontSize={20}
            borderRadius={10}
          >
            {tech}
          </Text>
        ))}
      </Flex>
      <Box bg="#333" mt={space.md} p={space.md} borderRadius={5}>
        <Text>Progress</Text>
        <Progress
          colorScheme="green"
          height="20px"
          size="sm"
          mt={4}
          data-testid={`progress-bar-${Project._id}`}
          borderRadius="10px"
          value={Project.process}
        />
      </Box>
      <Flex
        flexDirection={['column', 'row']}
        justifyContent="space-between"
        alignItems="center"
        gap={space.md}
        mt={space.md}
      >
        <Button
          as={RouterLink}
          to={`/Projects/${Project._id}`}
          w={['100%', 'auto']}
          colorScheme="blue"
        >
          More
        </Button>
        <Button
          flex={['', '', 1]}
          as={RouterLink}
          to={`/ShareProject/${Project._id}`}
          w={['100%', 'auto']}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          Share Project
        </Button>
        <Button
          flex={['', 1, '']}
          as={RouterLink}
          to={`/Project/Sessions/${Project._id}`}
          w={['100%', 'auto']}
        >
          Work Sessions
        </Button>

        <Text
          textAlign="right"
          p={space.md}
          bg={secondary[200]}
          borderRadius={space.sm}
        >
          {format(parseISO(Project.date), "dd-MM-yyyy' 'HH:mm")}
        </Text>
      </Flex>
    </Box>
  );
}

export default ProjectCard;
