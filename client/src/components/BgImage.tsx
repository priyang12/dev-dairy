import { Box } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import React from 'react';

interface ComponentProps extends BoxProps {
  BgImageData: {
    url?: string;
    ImageFile?: any;
  };
  children: React.ReactNode;
}

function BgImage({ BgImageData, children, ...rest }: ComponentProps) {
  return (
    <Box
      backgroundPosition={['none', 'none', 'center center']}
      width="100%"
      style={{
        backgroundImage: `url(${
          BgImageData.ImageFile ? BgImageData.ImageFile : BgImageData.url
        })`,
      }}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      zIndex={-1}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default BgImage;
