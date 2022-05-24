import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Progress,
  Text,
} from '@chakra-ui/react';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import RandomColor from '../utils/RandomColor';
import type { IProject } from '../interface';

function ProjectCard({ Project }: { Project: IProject }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" width="100%">
      <Heading fontSize="xl">{Project.title}</Heading>
      <Text mt={4}>{Project.description}</Text>

      <Flex gap={['4', '5', '10']} mt={5} direction={['column', 'row']}>
        {Project.technologies.map((tech) => (
          <Text
            key={tech}
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
          borderRadius="10px"
          value={Project.process}
        />
      </Box>
      <Flex justifyContent="space-between" alignItems="center" mt={5}>
        <Button>
          <Link as={RouterLink} to={`/Projects/${Project._id}`}>
            More
          </Link>
        </Button>
        <Text textAlign="right">
          {moment(Project.date).format('D MMM YYYY, h:mm:ss')}
        </Text>
      </Flex>
    </Box>
  );
}

export default ProjectCard;
