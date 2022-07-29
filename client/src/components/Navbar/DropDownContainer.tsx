import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/AuthSlice';

function LinkItem({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <MenuItem
      _hover={{
        borderTop: '2px solid',
        borderBottom: '2px solid',
        borderColor: isDark ? 'white' : 'gray.100',
      }}
      _focus={{
        borderColor: isDark ? 'white' : 'gray.100',
        borderTop: '2px solid',
        borderBottom: '2px solid',
      }}
    >
      {children}
    </MenuItem>
  );
}

function DropDownContainer() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const dispatch = useDispatch();

  const isDark = true;

  const onLogout = () => {
    localStorage.clear();
    removeCookie('token');
    dispatch(logout());
    window.location.reload();
  };
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            mx={5}
            px={5}
            py={4}
            border="2px solid"
            borderColor="primary.700"
            borderRadius={5}
            h="fit-content"
            rounded="full"
            _hover={{ bg: isDark ? 'primary.800' : 'primary.300' }}
            _focus={{
              borderColor: isDark ? 'primary.200' : 'primary.300',
            }}
            aria-label="Courses"
            fontWeight="normal"
          >
            <span>{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
          </MenuButton>
          <MenuList
            zIndex={2000}
            fontSize="3xl"
            bg="transparent"
            className="card"
          >
            <Link
              as={RouterLink}
              to="/Projects"
              color="white"
              _hover={{ color: 'blue.500' }}
            >
              <LinkItem isDark={isDark}>
                <span className="hide-sm">Projects</span>
              </LinkItem>
            </Link>

            <Link
              as={RouterLink}
              to="/Sessions"
              _hover={{ color: isDark ? 'green.500' : 'gray.100' }}
            >
              <LinkItem isDark={isDark}>
                <span className="hide-sm">WorkSessions</span>
              </LinkItem>
            </Link>

            <div className="dropdown-divider" />

            <Link
              as={RouterLink}
              onClick={onLogout}
              to="/login"
              color="white"
              _hover={{ color: 'red.500' }}
            >
              <LinkItem isDark={isDark}>
                <i className="fas fa-sign-out-alt" />
                <span className="hide-sm">Logout</span>
              </LinkItem>
            </Link>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default DropDownContainer;
