import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import { space } from '../../Theme';
import { CheckError } from '../../utils/helpers';

const GetErrorFont = (message: string): string => {
  if (message.length < 50) {
    return space['2xl'];
  } else if (message.length < 70) {
    return space.xl;
  } else if (message.length < 150) {
    return space.xl;
  } else {
    return space.lg;
  }
};

const FallbackUI = ({ error, componentStack }: any) => {
  const resetErrorBoundary = () => {
    window.location.reload();
  };

  const message = CheckError({ error: error });

  return (
    <Flex
      background={`url("https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80")
    repeat center/cover`}
      minH="100vh"
    >
      <Helmet>
        <title>Opps Error!</title>
        <meta name="description" content={`Error - ${message}`} />
      </Helmet>
      <Flex
        direction="column"
        justifyContent="center"
        className="glass"
        w={['100%', '80vw', '70vw']}
        m="auto"
        borderRadius={space.lg}
        p={space.md}
      >
        <Box fontFamily="fantasy">
          {message ? (
            <Text as="p" fontSize={[space.lg, GetErrorFont(message)]}>
              {message}
            </Text>
          ) : (
            <Text as="p" fontSize={[space.xl, space['2xl']]}>
              Something went wrong
            </Text>
          )}
          <br />
          {componentStack}
        </Box>
        <Button
          onClick={resetErrorBoundary}
          colorScheme="assert"
          variant="outline"
          p={[space.lg, space.lg, space.xl]}
        >
          Try again (Reload Page)
        </Button>
      </Flex>
    </Flex>
  );
};

const ErrorBoundaryUI = ({
  CustomComponent = FallbackUI,
  children,
}: {
  CustomComponent?: any;
} & React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <ErrorBoundary FallbackComponent={CustomComponent}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryUI;
