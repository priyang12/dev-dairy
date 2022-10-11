import {
  Box,
  Button,
  Container,
  createIcon,
  Text,
  Heading,
  Icon,
  Stack,
  Link,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Navigate, Link as ReactLink } from 'react-router-dom';
import Data from './Data.json';
import type { AuthState } from '../../interface';

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});

function LandingPage() {
  const { authenticated }: AuthState = useSelector(
    (state: any) => state.Auth,
  );

  if (authenticated) return <Navigate to="/Posts" />;

  return (
    <Box id="landing-page">
      <Container>
        <svg
          viewBox="0 0 528 560"
          focusable="false"
          className="chakra-icon css-w1ojc0"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            backdropFilter: 'blur(16px) saturate(180%)',
            backgroundColor: 'rgba(17, 25, 40, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.125)',
          }}
        >
          <defs>
            <filter id="blur">
              <feGaussianBlur stdDeviation="50" />
            </filter>
          </defs>
          <circle
            cx="71"
            cy="61"
            r="111"
            fill="#F56565"
            filter="url(#blur)"
          />
          <circle
            cx="244"
            cy="106"
            r="139"
            fill="#ED64A6"
            filter="url(#blur)"
          />
          <circle
            cy="291"
            r="139"
            fill="#ED64A6"
            filter="url(#blur)"
          />
          <circle
            cx="80.5"
            cy="189.5"
            r="101.5"
            fill="#ED8936"
            filter="url(#blur)"
          />
          <circle
            cx="196.5"
            cy="317.5"
            r="101.5"
            fill="#ECC94B"
            filter="url(#blur)"
          />
          <circle
            cx="70.5"
            cy="458.5"
            r="101.5"
            fill="#48BB78"
            filter="url(#blur)"
          />
          <circle
            cx="426.5"
            cy="-0.5"
            r="101.5"
            fill="#4299E1"
            filter="url(#blur)"
          />
        </svg>

        <Stack
          as={Box}
          textAlign="center"
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 200 }}
          height="150vh"
          backgroundColor="#fafafa"
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight="110%"
            color="black"
          >
            {Data.heading}
            {' '}
            <br />
            <Text as="span" color="green.400">
              {Data.subheading}
            </Text>
          </Heading>
          <Text color="gray.500" p={5}>
            {Data.paragraph}
          </Text>
          <Stack
            direction="column"
            spacing={3}
            align="center"
            alignSelf="center"
            position="relative"
          >
            <Button
              fontSize="3xl"
              p={5}
              colorScheme="green"
              bg="green.400"
              rounded="full"
              px={6}
              _hover={{
                bg: 'green.500',
              }}
            >
              <Link as={ReactLink} to="/Register">
                Register
              </Link>
            </Button>
            <Button
              fontSize="3xl"
              p={5}
              variant="link"
              colorScheme="blue"
              size="sm"
            >
              <Link as={ReactLink} to="/login">
                Login
              </Link>
            </Button>
            <Box color="primary.800">
              <Icon
                as={Arrow}
                w={71}
                position="absolute"
                right={-71}
                top="10px"
              />
              <Text
                fontSize="lg"
                fontFamily="Caveat"
                position="absolute"
                right="-125px"
                top="-15px"
                transform="rotate(10deg)"
              >
                {Data.TiltText}
              </Text>
            </Box>
          </Stack>
        </Stack>
        <svg
          viewBox="40 20 528 560"
          focusable="false"
          className="chakra-icon css-w1ojc0"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            backdropFilter: 'blur(16px) saturate(180%)',
            backgroundColor: 'rgba(17, 25, 40, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.125)',
          }}
        >
          <defs>
            <filter id="blur2">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          <circle
            cx="300"
            cy="100"
            r="111"
            fill="#F56565"
            filter="url(#blur2)"
          />
          <circle
            cx="500"
            cy="106"
            r="139"
            fill="#ED64A6"
            filter="url(#blur2)"
          />
          <circle
            cx="470"
            cy="351"
            r="139"
            fill="#bf236e"
            filter="url(#blur2)"
          />
          <circle
            cx="500.5"
            cy="189.5"
            r="101.5"
            fill="#ED8936"
            filter="url(#blur2)"
          />
          <circle
            cx="350.5"
            cy="207.5"
            r="101.5"
            fill="#ECC94B"
            filter="url(#blur2)"
          />
          <circle
            cx="550.5"
            cy="540.5"
            r="101.5"
            fill="#48BB78"
            filter="url(#blur2)"
          />
          <circle
            cx="300.5"
            cy="-0.5"
            r="101.5"
            fill="#4299E1"
            filter="url(#blur2)"
          />
        </svg>
      </Container>
    </Box>
  );
}

export default LandingPage;
