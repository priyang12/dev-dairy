import { Box, Button, Flex, Heading, Progress, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import RandomColor from '../../utils/RandomColor';
import type { IProject } from '../../interface';

function ProjectCard({ Project }: { Project: IProject }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" width="100%">
      <Heading fontSize="xl">{Project.title}</Heading>
      <Text mt={4}>{Project.description}</Text>

      <Flex
        gap={['4', '5', '10']}
        mt={5}
        direction={['column', 'row']}
      >
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
      <Box bg="#333" mt={5} p={5} borderRadius={5}>
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
        justifyContent="space-between"
        gap={5}
        alignItems="center"
        mt={5}
      >
        <Button as={RouterLink} to={`/Projects/${Project._id}`}>
          More
        </Button>
        <Button
          flex={1}
          as={RouterLink}
          to={`/Project/Sessions/${Project._id}`}
        >
          Work Sessions
        </Button>
        <Text textAlign="right">
          {format(parseISO(Project.date), "yyyy-MM-dd'T'HH:mm")}
        </Text>
      </Flex>
    </Box>
  );
}

export default ProjectCard;
