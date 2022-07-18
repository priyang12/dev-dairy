/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/AuthSlice';

function DropDownContainer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <div>
      <Menu isOpen={isOpen}>
        <MenuButton
          mx={5}
          px={5}
          py={4}
          border="2px solid"
          borderColor="primary.700"
          borderRadius={5}
          rounded="full"
          _hover={{ bg: isDark ? 'primary.800' : 'primary.300' }}
          _focus={{
            borderWidth: '4px',
            borderColor: isDark ? 'primary.800' : 'primary.300',
          }}
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
          bg="#7957574e"
          className="card"
        >
          <MenuItem>
            <Link
              as={RouterLink}
              to="/Projects"
              color="white"
              _hover={{ color: 'blue.500' }}
            >
              <span className="hide-sm">Projects</span>
            </Link>
          </MenuItem>

          <div className="dropdown-divider" />
          <MenuItem>
            <Link
              as={RouterLink}
              onClick={onLogout}
              to="/login"
              color="white"
              _hover={{ color: 'red.500' }}
            >
              <i className="fas fa-sign-out-alt" />{' '}
              <span className="hide-sm">Logout</span>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default DropDownContainer;
