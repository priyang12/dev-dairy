import { Box, Flex, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { AuthState } from '../interface';

function LandingPage() {
  const { authenticated }: AuthState = useSelector((state: any) => state.Auth);

  if (authenticated) return <Navigate to="/feeds" />;

  return (
    <Box as="div" className="top" bgColor={['']}>
      <Flex
        justifyContent="center"
        alignItems="center"
        marginTop={['10', '50']}
      >
        <Box margin={50}>
          <Heading as="h1" fontSize={['4xl', '6xl', '9xl']}>
            Developer Connector
          </Heading>
          <Heading
            as="p"
            fontSize={['xl', 'xl', '2xl']}
            textAlign={['left', 'left', 'center']}
          >
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}

export default LandingPage;
