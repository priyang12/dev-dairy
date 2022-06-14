import { Box } from '@chakra-ui/react';

function MarginContainer(props: any) {
  const { children, ...rest } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box mx={[10, 50, 100, 150, 200]} {...rest}>
      {' '}
      {children}
    </Box>
  );
}

export default MarginContainer;
