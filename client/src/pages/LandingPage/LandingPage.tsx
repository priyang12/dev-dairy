import { Box, Flex, Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { AuthState } from '../../interface';

function LandingPage({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
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
            {heading}{' '}
          </Heading>
          <Heading
            as="p"
            fontSize={['xl', 'xl', '2xl']}
            textAlign={['left', 'left', 'center']}
          >
            {subheading}
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}

export default LandingPage;
