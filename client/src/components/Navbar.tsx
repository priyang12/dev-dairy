/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link as RouterLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  IconButton,
  Box,
  Link,
  Heading,
  Menu,
  useDisclosure,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import Logo from '../Assets/diary.png';
import { logout } from '../features/AuthSlice';
import type { AuthState } from '../interface';

function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const Auth: AuthState = useSelector((state: any) => state.Auth);
  // const ColorPreference = useColorModePreference();
  // const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDark = true;

  const [display, changeDisplay] = useState(false);
  const dispatch = useDispatch();
  // useLayoutEffect(() => {
  //   if (ColorPreference === 'dark') {
  //     toggleColorMode();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ColorPreference]);
  const onLogout = () => {
    localStorage.clear();
    removeCookie('token');
    dispatch(logout());
    window.location.reload();
  };

  const AuthLinks = (
    <div>
      <Menu isOpen={isOpen}>
        {/* <span>{user?.displayName}</span> */}
        <MenuButton
          mx={5}
          py={[1, 2, 2]}
          px={4}
          borderRadius={5}
          _hover={{ bg: isDark ? '#102344' : 'black' }}
          _focus={{ border: `2px solid${isDark ? 'gray.700' : 'gray.100'}` }}
          aria-label="Courses"
          fontWeight="normal"
          onClick={onOpen}
          onMouseLeave={onClose}
        >
          <span>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
        </MenuButton>
        <MenuList
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          zIndex={2000}
          fontSize="3xl"
        >
          <MenuItem>
            <Link
              as={RouterLink}
              to="/Projects"
              _hover={{ color: isDark ? 'blue.500' : 'gray.100' }}
            >
              <span className="hide-sm">Projects</span>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              as={RouterLink}
              to="/feeds"
              _hover={{ color: isDark ? 'blue.500' : 'gray.100' }}
            >
              <span className="hide-sm">feeds</span>
            </Link>
          </MenuItem>

          <div className="dropdown-divider" />
          <MenuItem>
            <Link
              as={RouterLink}
              onClick={onLogout}
              to="/login"
              _hover={{ color: isDark ? 'red.500' : 'gray.100' }}
            >
              <i className="fas fa-sign-out-alt" />{' '}
              <span className="hide-sm">Logout</span>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
  const UnAuthLinks = (
    <Flex flexDir={['column', 'column', 'row']} width="80%" gap={5}>
      <Link
        onClick={() => changeDisplay(false)}
        as={RouterLink}
        to="/login"
        backgroundColor={isDark ? 'gray.700' : 'gray.100'}
        _hover={{ color: 'gray.500' }}
        border="10px solid #102344"
        outline="2px solid white"
        borderRadius={10}
        textAlign="center"
        padding={2}
      >
        Login
      </Link>

      <Link
        onClick={() => changeDisplay(false)}
        as={RouterLink}
        to="/register"
        backgroundColor={isDark ? 'gray.700' : 'gray.100'}
        _hover={{ color: 'gray  .500' }}
        border="10px solid #102344"
        outline="2px solid white"
        borderRadius={10}
        textAlign="center"
        padding={2}
      >
        Register
      </Link>
    </Flex>
  );

  return (
    <Flex
      zIndex={2}
      bgColor={isDark ? '#102344' : 'gray.200'}
      as="nav"
      width="100%"
      position="fixed"
      top="0"
      right="0"
      py={['6vh', '8vh', '10vh', '10vh']}
      px={[10, 50, 70, 100, 200]}
      height="10vh"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link
        as={RouterLink}
        to="/"
        _hover={{ color: 'black.600' }}
        className="nav-link"
      >
        <Flex alignItems="center">
          <img src={Logo} width={50} alt="Logo" />
          <Box ml={2}>
            <Heading fontFamily="cursive">
              <span className="logo-text">Dairy</span>
            </Heading>
          </Box>
        </Flex>
      </Link>
      <Flex align="center">
        <Flex display={['none', 'none', 'flex', 'flex']} fontSize="2xl">
          {Auth.authenticated ? AuthLinks : UnAuthLinks}
        </Flex>

        <IconButton
          aria-label="Open Menu"
          size="lg"
          _focus={{ outline: 'none', border: '3px solid teal.600' }}
          bgColor={isDark ? 'blackAlpha.100' : 'blackAlpha.500'}
          mr={2}
          icon={<HamburgerIcon />}
          onClick={() => changeDisplay(true)}
          display={['flex', 'flex', 'none', 'none']}
        />
      </Flex>

      <Flex
        w="100vw"
        as={motion.div}
        animate={display ? 'show' : 'hidden'}
        variants={{
          hidden: { y: -1000, opacity: 0 },
          show: { y: 1, opacity: 1 },
        }}
        bgColor={isDark ? '#102344' : 'wheat'}
        zIndex={20}
        pos="fixed"
        top="0"
        left="0"
        padding="5vh"
        height={`${isOpen ? '70vh' : 'fit-content'}`}
        overflowY="auto"
        flexDir="column"
        justifyContent={['flex-start', 'flex-start', 'center', 'center']}
      >
        <Flex justify="space-between" alignItems="center" py={5}>
          <Link
            as={RouterLink}
            to="/"
            _hover={{ color: 'black.600' }}
            className="nav-link"
          >
            <Flex alignItems="center">
              <img src={Logo} width={50} alt="Logo" />
              <Box ml={2}>
                <Heading fontFamily="cursive">
                  <span className="logo-text">Dairy</span>
                </Heading>
              </Box>
            </Flex>
          </Link>
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            bgColor={isDark ? 'blackAlpha.100' : 'blackAlpha.500'}
            icon={<CloseIcon />}
            onClick={() => changeDisplay(false)}
          />
        </Flex>

        <Flex flexDir="column" align="flex-start" fontSize={20}>
          {/* <Switch color="green" isChecked={isDark} /> */}
          {Auth.authenticated ? AuthLinks : UnAuthLinks}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Navbar;
