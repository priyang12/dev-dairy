import React from 'react';
import {
  Link,
  Box,
  Flex,
  Container,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import Logo from '../../Assets/diary.png';
import NavLinks from './NavLink';
import type { AuthState } from '../../interface';
import { StoreState } from '../../store';
import { assert } from '../../Theme';

function StyledIcon({ children, isDark, ...props }: any) {
  return (
    <IconButton
      aria-label="Open Menu"
      size="lg"
      bgColor={isDark ? 'blackAlpha.100' : 'blackAlpha.500'}
      _focus={{ outline: 'none', border: '3px solid teal.600' }}
      mr={2}
      display={['flex', 'flex', 'none', 'none']}
      {...props}
    >
      {children}
    </IconButton>
  );
}

function MenuToggle({ toggle, isOpen }: any) {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? (
        <StyledIcon>
          <CloseIcon />
        </StyledIcon>
      ) : (
        <StyledIcon>
          <HamburgerIcon />
        </StyledIcon>
      )}
    </Box>
  );
}

function NavBarContainer({ children, ...props }: any) {
  return (
    <Flex
      zIndex={2}
      as="nav"
      align="center"
      position="sticky"
      top="0"
      right="0"
      wrap="wrap"
      w="100%"
      p={10}
      bg="primary.900"
      {...props}
    >
      <Container maxW="900px">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap={['wrap', 'wrap', 'nowrap', 'nowrap']}
        >
          {children}
        </Flex>
      </Container>
    </Flex>
  );
}

function LogoComponent() {
  return (
    <Link
      as={RouterLink}
      to="/"
      color={assert[600]}
      _hover={{ color: 'secondary.600' }}
      className="nav-link"
    >
      <Flex alignItems="center" width="50px">
        <img src={Logo} width={50} alt="Logo" />
        <Box ml={2}>
          <Heading fontFamily="cursive">
            <span className="logo-text">Dairy</span>
          </Heading>
        </Box>
      </Flex>
    </Link>
  );
}

function NavBar() {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const { authenticated }: AuthState = useSelector(
    (state: StoreState) => state.Auth,
  );
  return (
    <NavBarContainer>
      <LogoComponent />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <NavLinks isOpen={isOpen} isAuth={authenticated} />
    </NavBarContainer>
  );
}

export default NavBar;
