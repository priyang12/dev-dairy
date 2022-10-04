import { Stack, Box, Link, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import DropDownContainer from './DropDownContainer';

function MenuItem({ children, isDark, isLast, to = '/', ...rest }: any) {
  return (
    <Link
      as={RouterLink}
      to={to}
      color="white"
      backgroundColor={isDark ? 'primary.200' : 'primary.600'}
      border="5px solid"
      height="fit-content"
      borderColor="primary.900"
      borderRadius={10}
      rounded="lg"
      _hover={{
        outline: '2px solid white',
        color: 'white',
      }}
      _focus={{
        outline: '2px solid white',
      }}
      transition="all 0.2s ease-in-out"
      textAlign="center"
      padding={2}
      {...rest}
    >
      {children}
    </Link>
  );
}

function NavLinks({ isOpen, isAuth }: { isOpen: boolean; isAuth: boolean }) {
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      as={motion.div}
      animate={isOpen ? 'show' : 'hidden'}
      variants={{
        hidden: { y: -1000, opacity: 0 },
        show: { y: 1, opacity: 1 },
      }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'column', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {!isAuth ? (
          <>
            <MenuItem to="/login" w={['100%', '50%', 'auto']}>
              Log In
            </MenuItem>
            <MenuItem to="/register" w={['100%', '50%', 'auto']}>
              Register{' '}
            </MenuItem>
          </>
        ) : (
          <Flex gap={10} justifyContent="space-around" w="100%">
            <Flex direction={['column', 'row', 'row']} gap={5}>
              <MenuItem to="/posts">Posts</MenuItem>
            </Flex>
            <DropDownContainer />
          </Flex>
        )}
      </Stack>
    </Box>
  );
}

export default NavLinks;
