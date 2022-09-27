import { Button, Heading } from '@chakra-ui/react';
import Container from '../../components/Container';
import Project from './Project';
import ShareModal from './ShareModal';

function ShareProject() {
  return (
    <Container>
      <Heading fontSize="4xl">ShareProject</Heading>
      <Project />
      <ShareModal />
    </Container>
  );
}
export default ShareProject;
