import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  Link,
  Progress,
  Box,
  Divider,
  Center,
} from '@chakra-ui/react';
import { CheckIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { useGetSharedProject } from '../../API/ShareProjectAPI';
import Container from '../../components/Container';
import Spinner from '../../components/spinner';
import RandomColor from '../../utils/RandomColor';
import { format, parseISO } from 'date-fns/esm';

function WrappedText({
  TextValue,
  ...props
}: {
  TextValue: string;
  [key: string]: any;
}) {
  return (
    <Text
      textOverflow="ellipsis"
      overflow="hidden"
      whiteSpace="nowrap"
      {...props}
    >
      {TextValue}
    </Text>
  );
}

function ExternalLink({ LinkTo }: { LinkTo: string }) {
  return (
    <Link
      href={LinkTo}
      isExternal
      display="flex"
      gap={5}
      px={5}
      borderRadius={10}
      justifyItems="center"
      alignItems="center"
      w={['100%', '90%', '70%']}
      _hover={{
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: '#000',
      }}
    >
      <>
        <ExternalLinkIcon mx="2px" />
      </>
      <WrappedText TextValue={LinkTo} />
    </Link>
  );
}

function Deploy({ live }: { live: boolean }) {
  return (
    <Heading
      as="h3"
      fontSize="2xl"
      mt={5}
      py={5}
      borderBottom="4px solid white"
    >
      {live ? (
        <>
          <span>Deployed : Yes</span>
          <span>
            <Icon as={CheckIcon} fontSize="4xl" />
          </span>
        </>
      ) : (
        <Text as="span" fontSize="1rem">
          Not Yet Deployed
        </Text>
      )}
    </Heading>
  );
}

function UserSection({ name, email }: { name: string; email: string }) {
  return (
    <Box className="card" p="md" my="xl">
      <Heading>Username : {name}</Heading>
      <Text fontSize="2xl">Project Owner Email : {email}</Text>
    </Box>
  );
}

function Share() {
  const { token } = useParams<{ token: string }>();
  const { data: project, isLoading } = useGetSharedProject(token as string);

  if (isLoading) return <Spinner />;
  if (!project) return null;

  return (
    <Container my="lg">
      <Heading fontSize="4xl">Project Title : {project.title}</Heading>
      <Text as="p" fontSize="3xl">
        Project Description : {project.description}
      </Text>
      <Heading as="h2" fontSize="2xl" my={5}>
        Technologies :
      </Heading>
      <Grid
        p={5}
        gap="10"
        w="100%"
        alignItems="center"
        border="1px solid white"
        templateColumns="repeat(auto-fit, minmax(150px, 1fr))"
        className="card"
        borderRadius={10}
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
      <Box className="card" px={['md', 'xl']} my="md">
        {project.live && <Deploy live={project.live} />}
        {project.website && (
          <Flex
            gap={5}
            py={['sm', 'md', 'xl']}
            fontSize="3xl"
            justifyContent="space-between"
            flexDir={['column', 'column', 'column', 'row']}
          >
            <span>Website : </span>
            <ExternalLink LinkTo={project.website} />
          </Flex>
        )}
        {project.github && (
          <Flex
            gap={5}
            py={5}
            fontSize="3xl"
            justifyContent="space-between"
            flexDir={['column', 'column', 'column', 'row']}
          >
            <span>Github : </span>
            <ExternalLink LinkTo={project.github} />
          </Flex>
        )}
      </Box>

      {project.roadMap && (
        <>
          <Heading
            as="h3"
            fontSize="3xl"
            mt={5}
            py={5}
            textAlign={['center', 'center', 'left']}
          >
            RoadMap : {project.roadMap.length}
          </Heading>
          {project.roadMap.map((road) => (
            <Flex
              key={road._id}
              p={5}
              my={5}
              gap={5}
              bg="#0a0b127d"
              fontSize="3xl"
              borderBottom="1px solid white"
              justifyContent="space-between"
              flexDir={['column', 'column', 'row']}
              borderBottomRadius={10}
              borderColor="ffffff20"
            >
              <WrappedText
                as="span"
                w={['100%', '50%', '50%', '50%']}
                TextValue={road.name.toUpperCase()}
              />
              <Center w="30%">
                <Divider
                  orientation="vertical"
                  display={['none', 'none', 'block']}
                  borderWidth="2px"
                />
              </Center>
              <Box w="50%">
                <Text fontSize="2xl">
                  Work
                  {road.progress} %
                </Text>
                <Progress
                  mt="sm"
                  size="sm"
                  height="20px"
                  colorScheme="green"
                  borderRadius="10px"
                  value={road.progress}
                />
              </Box>
            </Flex>
          ))}
        </>
      )}

      <Text
        p="md"
        mt="xl"
        ml="auto"
        w="fit-content"
        fontSize="5xl"
        className="card"
      >
        {format(parseISO(project.date), 'dd-MMM yyyy')}
      </Text>

      <UserSection name={project.user.username} email={project.user.email} />
    </Container>
  );
}
export default Share;
