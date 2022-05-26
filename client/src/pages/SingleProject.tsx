import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
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
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import { Navigate, useParams } from 'react-router-dom';
import {
  useAddRoadMapMutation,
  useDeleteProjectMutation,
  useGetProjectIdQuery,
  useRemoveRoadMapMutation,
} from '../API/ProjectAPI';
import DeleteRoadMapModal from '../components/DeleteRoadMap';
import ModalComponent from '../components/ModalComponent';
import RoadMapModal from '../components/RoadMapModal';
import RandomColor from '../utils/RandomColor';

function SingleProject() {
  const params = useParams();
  const {
    isFetching,
    isLoading,
    data: project,
  } = useGetProjectIdQuery(params.id);

  const [DeleteProjectMutation, DeleteResult] = useDeleteProjectMutation();
  const [RoadMapMutate, RoadMapResult] = useAddRoadMapMutation();
  const [DeleteRoadMap, DeleteMapResult] = useRemoveRoadMapMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isFetching || isLoading) return <div>Loading...</div>;
  if (project === null) {
    return <div className="top">No Project Found</div>;
  }
  if (DeleteResult.isSuccess) {
    return <Navigate to="/projects" />;
  }
  return (
    <div className="top">
      <Container maxW="800px" mb={10}>
        <Flex justifyContent="space-between" alignItems="center" m={5}>
          <Heading>Title : {project.title}</Heading>
          <Text textAlign="right">
            {moment(project.date).format('D MMM YYYY, h:mm:ss')}
          </Text>
        </Flex>
        <Text>Description : {project.description}</Text>
        <Flex
          gap={['4', '5', '10']}
          mt={5}
          direction={['column', 'row']}
          alignItems="center"
        >
          <Heading as="h2" fontSize="2xl">
            Technologies
          </Heading>
          {project.technologies.map((tech: any) => (
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
        <Heading as="h3" fontSize="2xl" mt={5}>
          Deployed :{' '}
          {project.live ? (
            <Icon bg="red" as={CheckIcon} fontSize="4xl" />
          ) : (
            <Icon bg="red" as={CloseIcon} fontSize="4xl" />
          )}
        </Heading>
        {project.roadMap && (
          <Box justifyContent="space-between" alignItems="center" mt={5}>
            <Flex alignItems="center" m={5}>
              <Heading as="h3" fontSize="2xl">
                Road Map
              </Heading>
              <RoadMapModal
                onSubmit={RoadMapMutate}
                result={RoadMapResult}
                projectId={params.id}
              />
              <DeleteRoadMapModal
                onSubmit={RoadMapMutate}
                result={RoadMapResult}
                projectId={params.id}
              />
            </Flex>

            <Accordion allowToggle>
              {project.roadMap.map((road: any) => (
                <AccordionItem>
                  <AccordionButton>
                    <Text
                      key={road.name}
                      p={2}
                      bg={`${road.color ? road.color : RandomColor()}`}
                      fontSize={20}
                      borderRadius={10}
                      width="100%"
                    >
                      {road.name}
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
                      <Button
                        colorScheme="red"
                        mt={5}
                        isLoading={DeleteMapResult.isLoading}
                        loadingText="Deleting..."
                        onClick={() => {
                          DeleteRoadMap({
                            projectId: params.id,
                            RoadMapId: road._id,
                          });
                        }}
                      >
                        Delete {road.name} RoadMap
                      </Button>
                    </>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
            {project.github && (
              <Box mt={5}>
                <Text>
                  <a href={project.github}>Github Link</a>
                </Text>
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
          <ModalComponent
            Title="Delete Project"
            isOpen={isOpen}
            onClose={onClose}
          >
            <Box>
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
                onClick={() => {
                  DeleteProjectMutation(project._id);
                  // onClose();
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
