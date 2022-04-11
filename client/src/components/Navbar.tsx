import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  Box,
  Link,
  Heading,
  Menu,
  useDisclosure,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModePreference,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { logout } from '../actions/AuthAction';
import type { AuthState } from '../actions/interfaces';

function Navbar() {
  const { isAuth, user }: AuthState = useSelector((state: any) => state.Auth);
  const dispatch = useDispatch();
  const ColorPreference = useColorModePreference();
  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isDark = ColorPreference === 'dark';
  const [display, changeDisplay] = useState(false);
  const onLogout = () => {
    localStorage.clear();
    sessionStorage.removeItem('user');
    dispatch(logout());
  };

  const AuthLinks = (
    <div>
      <Menu isOpen={isOpen}>
        <span>{user?.displayName}</span>
        <MenuButton
          mx={5}
          py={[1, 2, 2]}
          px={4}
          borderRadius={5}
          _hover={{ bg: isDark ? 'gray.700' : 'gray.100' }}
          aria-label="Courses"
          fontWeight="normal"
          onClick={onOpen}
        >
          <span>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
        </MenuButton>
        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} zIndex={2000}>
          <MenuItem>
            <Link as={RouterLink} to={`/profile/${user?.uid}`}>
              <span className="hide-sm">Profile</span>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link as={RouterLink} to="/editProfile">
              <span className="hide-sm">Edit Profile</span>
            </Link>
          </MenuItem>

          <div className="dropdown-divider" />
          <MenuItem>
            <Link as={RouterLink} onClick={onLogout} to="/Auth/login">
              <i className="fas fa-sign-out-alt" />{' '}
              <span className="hide-sm">Logout</span>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
  const UnAuthLinks = (
    <Flex flexDir={['column', 'column', 'row']} width="80%">
      <Link
        as={RouterLink}
        to="/Auth/login"
        _hover={{ color: 'teal.600' }}
        borderBottom="2px"
        padding={2}
      >
        Login
      </Link>

      <Link
        as={RouterLink}
        to="/Auth/register"
        _hover={{ color: 'teal.600' }}
        borderBottom="2px"
        padding={2}
      >
        Register
      </Link>
    </Flex>
  );

  return (
    <Flex
      zIndex={2020}
      bgColor={isDark ? 'gray.700' : 'gray.200'}
      as="nav"
      width="100%"
      position="fixed"
      top="0"
      right="0"
      padding={['6vh', '8vh', '10vh', '10vh']}
      height="10vh"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link
        as={RouterLink}
        to="/"
        _hover={{ color: 'teal.600' }}
        className="nav-link"
      >
        <Flex alignItems="center">
          <img
            src="https://picsum.photos/seed/picsum/200"
            alt="logo"
            width="50px"
            height="50px"
          />
          <Box ml={2}>
            <Heading fontFamily="cursive">
              <span className="logo-text">Logo</span>
            </Heading>
          </Box>
        </Flex>
      </Link>
      <Flex align="center">
        <Flex display={['none', 'none', 'flex', 'flex']} fontSize="2xl">
          {user ? AuthLinks : UnAuthLinks}
        </Flex>

        <IconButton
          aria-label="Open Menu"
          size="lg"
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
        bgColor={isDark ? 'black' : 'wheat'}
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
        <Flex justify="flex-end">
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
          <Switch color="green" isChecked={isDark} onChange={toggleColorMode} />
          {isAuth ? AuthLinks : UnAuthLinks}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Navbar;
