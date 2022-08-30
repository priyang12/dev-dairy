import type { BoxProps } from '@chakra-ui/react';
import { Container as CustomContainer } from '@chakra-ui/react';

interface ContainerProps extends BoxProps {
  children: React.ReactNode;
  MW?: string;
}

function Container({ children, MW = '900px', ...rest }: ContainerProps) {
  return (
    <CustomContainer maxW={MW} {...rest}>
      {children}
    </CustomContainer>
  );
}

export default Container;
