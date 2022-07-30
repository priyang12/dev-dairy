import { Box, Collapse, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiChevronDoubleDown, HiChevronDoubleUp } from 'react-icons/hi';
import Bar from './Bar';

function SessionWidget() {
  const [Display, setDisplay] = useState(false);

  return (
    <Box position="sticky" top="20%" right="0" bg="primary.800" zIndex={1}>
      <IconButton
        position="absolute"
        left="20%"
        top="-50%"
        aria-label="Drop"
        border="3px solid"
        borderColor="secondary.500"
        bg="black"
        color="red"
        onClick={() => setDisplay((State) => !State)}
        rotate={Display ? 180 : 0}
      >
        <HiChevronDoubleDown />
      </IconButton>
      <Collapse in={Display} animateOpacity>
        <Box
          display={Display ? 'block' : 'none'}
          transition="all 0.3s ease-in-out"
          borderBottom="2px solid #e6e6e6"
          p={5}
          mb={5}
          as={motion.div}
          animate={Display ? 'show' : 'hidden'}
          variants={{
            hidden: { y: -100, opacity: 0 },
            show: { y: 0, opacity: 1 },
          }}
        >
          <IconButton
            position="absolute"
            left="20%"
            bottom="10%"
            aria-label="Drop"
            border="3px solid"
            borderColor="secondary.500"
            bg="black"
            color="red"
            onClick={() => setDisplay((State) => !State)}
            rotate={Display ? 180 : 0}
          >
            <HiChevronDoubleUp />
          </IconButton>
          <Bar setDisplay={setDisplay} />
        </Box>
      </Collapse>
    </Box>
  );
}

export default SessionWidget;
