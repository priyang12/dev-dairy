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
  console.log(BgImageData);
  return (
    <Box
      style={{
        backgroundImage: `url(${
          BgImageData.ImageFile ? BgImageData.ImageFile : BgImageData.url
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        zIndex: -1,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </Box>
  );
}

export default BgImage;
