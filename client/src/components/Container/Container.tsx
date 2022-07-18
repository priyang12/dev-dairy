import type { BoxProps } from '@chakra-ui/react';
import { Container as CustomContainer } from '@chakra-ui/react';

interface ContainerProps extends BoxProps {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  MW?: string;
}

function Container({ children, MW = '900px' }: ContainerProps) {
  return <CustomContainer maxW={MW}>{children}</CustomContainer>;
}

export default Container;
