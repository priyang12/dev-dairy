import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Progress,
  Button,
  Text,
  Flex,
  Heading,
  Alert,
  AlertTitle,
  Spinner as ChakraSpinner,
  Box,
} from '@chakra-ui/react';
import invert from 'invert-color';
import { useParams, Navigate } from 'react-router-dom';
import {
  useCreateNewRoadMap,
  useGetProjectId,
  useGetRoadMaps,
  useRemoveRoadMap,
} from '../../API/ProjectAPI';
import Container from '../../components/Container';
import RoadMapModal from './RoadMapModal';
import Spinner from '../../components/spinner';
import RandomColor from '../../utils/RandomColor';
import EditRoadMap from './EditRoadMap';
import { assert } from '../../Theme';

function RoadMap() {
  const { id } = useParams<{ id: string }>();
  const { data: RoadMapData, isFetching } = useGetRoadMaps(id, {
    skip: !id,
  });
  const { isFetching: ProjectLoading, data: ProjectData } = useGetProjectId(
    id,
    {
      skip: !id,
    },
  );

  const [RoadMapMutate, RoadMapResult] = useCreateNewRoadMap();
  const [DeleteRoadMap, DeleteMapResult] = useRemoveRoadMap();

  if (!id) return <Navigate to="/projects" />;

  if (isFetching) return <Spinner />;

  return (
    <Container maxW="1200px" mt={20}>
      {ProjectData && !ProjectLoading && (
        <Box m={5}>
          <Heading as="h1" size="lg">
            {ProjectData.title}
          </Heading>
        </Box>
      )}
      <Flex alignItems="center" m={5}>
        <Heading as="h3" fontSize="3xl">
          Road Maps
        </Heading>
        <RoadMapModal onSubmit={RoadMapMutate} projectId={id} />
        {RoadMapResult.isLoading && (
          <Alert>
            <AlertTitle>Adding RoadMap</AlertTitle>
            <ChakraSpinner />
          </Alert>
        )}
      </Flex>
      <Accordion allowToggle>
        {RoadMapData && RoadMapData.length > 0 ? (
          RoadMapData.map((road) => (
            <AccordionItem key={road._id} bg={assert[800]}>
              <AccordionButton>
                <Text
                  key={road.name}
                  p={2}
                  bg={`${road.color ? road.color : RandomColor()}`}
                  color={`${road.color ? invert(road.color) : RandomColor()}`}
                  fontSize="3xl"
                  borderRadius={10}
                  width="100%"
                >
                  {road.name.toUpperCase()}
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={4} bg="primary.500">
                <Flex gap={5} mb={4} alignItems="center">
                  <Button
                    colorScheme="red"
                    isLoading={DeleteMapResult.isLoading}
                    loadingText="Deleting..."
                    onClick={() => {
                      DeleteRoadMap({
                        projectId: id,
                        RoadMapId: [road._id],
                      });
                    }}
                  >
                    Delete {road.name}
                  </Button>
                  <EditRoadMap ProjectID={id} RoadMap={road} />
                </Flex>
                <Text fontSize="2xl">
                  Work
                  {road.progress} %
                </Text>
                <Progress
                  colorScheme="green"
                  height="20px"
                  size="sm"
                  mt={4}
                  borderRadius="10px"
                  value={road.progress}
                />
              </AccordionPanel>
            </AccordionItem>
          ))
        ) : (
          <Alert status="info" p={10}>
            <AlertTitle fontSize="3xl">No RoadMap</AlertTitle>

            <Text>You can add a new RoadMap by clicking the button Above.</Text>
          </Alert>
        )}
      </Accordion>
    </Container>
  );
}
export default RoadMap;
