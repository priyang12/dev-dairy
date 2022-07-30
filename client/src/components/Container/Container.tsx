import type { BoxProps } from '@chakra-ui/react';
import { Container as CustomContainer } from '@chakra-ui/react';

interface ContainerProps extends BoxProps {
  children: React.ReactNode;
  MW?: string;
}

function Container({ children, MW = '900px' }: ContainerProps) {
  return <CustomContainer maxW={MW}>{children}</CustomContainer>;
}

export default Container;
