import { Box } from '@chakra-ui/react';

function MarginContainer({ children }: any) {
  return <Box mx={[10, 50, 200]}>{children}</Box>;
}

export default MarginContainer;
