import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Progress,
  Text,
  useDisclosure,
  Grid,
  GridItem,
  Link,
  Alert,
} from '@chakra-ui/react';
import { CheckIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { Navigate, useParams, Link as RouterLink } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import invert from 'invert-color';
import {
  useDeleteProjectMutation,
  useGetProjectIdQuery,
} from '../../API/ProjectAPI';
import type { AlertState, IRoadMap } from '../../interface';
import ModalComponent from '../../components/ModalComponent';
import Spinner from '../../components/spinner';
import RandomColor from '../../utils/RandomColor';

function SingleProject() {
  const { id } = useParams<{ id: string }>();
  const { alert }: AlertState = useSelector((state: any) => state.Alert);

  const { isFetching, isLoading, isError, data } = useGetProjectIdQuery(id, {
    skip: !id,
  });
  const project = data;
  const [DeleteProjectMutation, DeleteResult] = useDeleteProjectMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isFetching || isLoading) return <Spinner />;

  if (isError || !project) {
    return <div>No Project Found</div>;
  }
  if (DeleteResult.isSuccess) {
    return <Navigate to="/projects" />;
  }

  return (
    <div>
      <Container maxW="900px" mb={10}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          my={5}
          border="4px solid grey"
          borderRadius={10}
          p={5}
        >
          <Heading>
            Title : <span>{project.title}</span>
          </Heading>
          <Text textAlign="right" fontSize="2xl">
            {format(parseISO(project.date), "yyyy-MM-dd'T'HH:mm")}
          </Text>
        </Flex>
        <Text
          fontSize="3xl"
          w="100%"
          border="4px solid grey"
          borderRadius={10}
          p={5}
        >
          <Text as="span" fontWeight="medium">
            Description :
          </Text>

          <Text as="span" fontSize="2xl" w="100px" px="2" lineHeight="1px">
            {project.description}
          </Text>
        </Text>
        <Heading as="h2" fontSize="2xl" my={5}>
          Technologies :
        </Heading>
        <Grid
          gap="10"
          templateColumns="repeat(auto-fit, minmax(150px, 1fr))"
          // direction={['column', 'row']}
          alignItems="center"
          w="100%"
          border="4px solid white"
          borderRadius={10}
          p={5}
        >
          {project.technologies.map((tech: any) => (
            <GridItem
              key={tech}
              p={2}
              bg={`${RandomColor()}`}
              fontSize={20}
              borderRadius={10}
              textAlign="center"
            >
              {tech}
            </GridItem>
          ))}
        </Grid>
        <Heading
          as="h3"
          fontSize="2xl"
          mt={5}
          borderBottom="4px solid white"
          py={5}
        >
          Deployed :
          <Text as="span" px={5}>
            {project.live ? (
              <Icon as={CheckIcon} fontSize="4xl" />
            ) : (
              <Text as="span" fontSize="1rem">
                Not Yet Deployed
              </Text>
            )}
          </Text>
        </Heading>
        {project.website && (
          <Flex gap={5} fontSize="3xl" borderBottom="4px solid white" py={5}>
            <span>Website : </span>
            <Link
              href={project.website}
              isExternal
              _hover={{
                textDecoration: 'none',
                color: '#fff',
                backgroundColor: '#000',
              }}
              display="flex"
              gap={5}
              px={5}
              borderRadius={10}
              justifyItems="center"
              alignItems="center"
            >
              Link <ExternalLinkIcon mx="2px" />
            </Link>
          </Flex>
        )}
        {project.github && (
          <Flex gap={5} fontSize="3xl" borderBottom="4px solid white" py={5}>
            <span>Website : </span>
            <Link
              href={project.github}
              isExternal
              _hover={{
                textDecoration: 'none',
                color: '#fff',
                backgroundColor: '#000',
              }}
              display="flex"
              gap={5}
              px={5}
              borderRadius={10}
              justifyItems="center"
              alignItems="center"
            >
              Github <ExternalLinkIcon mx="2px" />
            </Link>
          </Flex>
        )}
        {project.roadMap.length > 0 && (
          <Box justifyContent="space-between" alignItems="center" mt={5}>
            <Flex alignItems="center" my={5}>
              <Heading as="h3" fontSize="2xl">
                Road Map
              </Heading>
            </Flex>

            <Accordion allowToggle>
              {project.roadMap.map((road: IRoadMap) => (
                <AccordionItem key={road._id}>
                  <AccordionButton>
                    <Text
                      key={road.name}
                      p={2}
                      bg={`${road.color ? road.color : RandomColor()}`}
                      color={`${
                        road.color ? invert(road.color) : RandomColor()
                      }`}
                      fontSize="1.5rem"
                      borderRadius={10}
                      width="100%"
                      textAlign={['left', 'center']}
                    >
                      {road.name.toUpperCase()}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <>
                      Work {road.progress} %
                      <Progress
                        colorScheme="green"
                        height="20px"
                        size="sm"
                        mt={4}
                        borderRadius="10px"
                        value={road.progress}
                      />
                    </>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            {project.github && (
              <Box mt={5} textAlign="center">
                <Link
                  fontSize="2rem"
                  textDecoration="none"
                  href={project.github}
                  _hover={{
                    color: 'blue.500',
                  }}
                >
                  Github Link : {project.github}
                </Link>
              </Box>
            )}
          </Box>
        )}
        <Container mt={5}>
          <Button
            colorScheme="red"
            w="100%"
            variant="outline"
            onClick={onOpen}
            _hover={{
              bg: 'red',
              color: 'white',
            }}
          >
            Delete Project
          </Button>
          <Button
            mt={5}
            as={RouterLink}
            to={`/EditProject/${project._id}`}
            colorScheme="blue"
            w="100%"
            p={5}
            variant="outline"
            onClick={onOpen}
            _hover={{
              bg: 'blue',
              color: 'white',
            }}
          >
            Edit Project
          </Button>
          <ModalComponent
            Title="Delete Project"
            isOpen={isOpen}
            onClose={onClose}
          >
            <Box>
              {alert && <Alert>{alert}</Alert>}
              <Text>Are you sure you want to delete this project?</Text>
              <Button
                colorScheme="red"
                w="100%"
                variant="outline"
                _hover={{
                  bg: 'red',
                  color: 'white',
                }}
                isLoading={DeleteResult.isLoading}
                loadingText="Deleting..."
                onClick={() => {
                  DeleteProjectMutation(project._id);
                }}
              >
                Delete
              </Button>
            </Box>
          </ModalComponent>
        </Container>
      </Container>
    </div>
  );
}

export default SingleProject;
