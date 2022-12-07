import { Box, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiChevronDoubleDown, HiChevronDoubleUp } from 'react-icons/hi';
import Bar from './Bar';

function WidgetIcon({
  setDisplay,
  Display,
  children,
  ...props
}: {
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  Display: boolean;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <IconButton
      position="absolute"
      aria-label="Drop"
      border="3px solid"
      borderColor="secondary.500"
      bg="black"
      color="red"
      onClick={() => setDisplay((State) => !State)}
      rotate={Display ? 180 : 0}
      {...props}
    >
      {children}
    </IconButton>
  );
}

function SessionWidget() {
  const [Display, setDisplay] = useState(false);

  return (
    <>
      {!Display && (
        <WidgetIcon
          zIndex={2}
          setDisplay={setDisplay}
          Display={Display}
          position="fixed"
          left="5%"
          bottom="0"
        >
          <HiChevronDoubleUp />
        </WidgetIcon>
      )}

      <Box
        p={5}
        w="100%"
        position="fixed"
        right="0"
        bottom="0"
        zIndex="10"
        bg="primary.700"
        borderBottom="2px solid #e6e6e6"
        as={motion.div}
        transition="all 0.3s ease-in-out"
        transform={Display ? 'translateY(0)' : 'translateY(100%)'}
      >
        {/* <Tooltip hasArrow label="Click to Copy"> */}
        {/* </Tooltip> */}
        <WidgetIcon
          setDisplay={setDisplay}
          Display={Display}
          right="10%"
          bottom="5%"
        >
          <HiChevronDoubleDown />
        </WidgetIcon>
        <Bar />
      </Box>
    </>
  );
}

export default SessionWidget;
