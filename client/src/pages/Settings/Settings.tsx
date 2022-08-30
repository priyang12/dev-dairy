import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { AiFillSetting } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { ImMenu } from 'react-icons/im';
import { Link, Outlet } from 'react-router-dom';
import Container from '../../components/Container';

function SideBarButton({
  icon,
  to,
  children,
  ...props
}: {
  icon: any;
  to: string;
  children?: React.ReactNode;
  [x: string]: any;
}) {
  return (
    <Button
      as={Link}
      to={to}
      leftIcon={icon}
      justifyContent="center"
      size="lg"
      p={2}
      fontSize="3xl"
      w={['fit-content', '100%']}
      {...props}
    >
      <Text
        w={['100%', '100%', '200px']}
        display={['none', 'block', 'inline-block']}
        fontSize="2xl"
      >
        {children}
      </Text>
    </Button>
  );
}

function Settings() {
  return (
    <Box m={10}>
      <Flex alignItems="center" gap={5}>
        <IconButton
          aria-label="SideBar"
          justifyContent="center"
          fontSize="3xl"
          display={['flex', 'none']}
        >
          <ImMenu />
        </IconButton>
        <Heading display={['block', 'none']} fontSize="5xl" textAlign="center">
          Settings <SettingsIcon />
        </Heading>
      </Flex>
      <Flex justifyContent="flex-start" alignItems="flex-start">
        <Box className="card" p={5}>
          <Heading
            display={['none', 'block']}
            fontSize="5xl"
            textAlign="center"
          >
            Settings
          </Heading>
          <Flex
            my={5}
            gap={5}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <SideBarButton to="Preference" icon={<AiFillSetting />}>
              Preference
            </SideBarButton>
            <SideBarButton to="Profile" icon={<CgProfile />}>
              Profile
            </SideBarButton>
          </Flex>
        </Box>
        <Container>
          <Outlet />
        </Container>
      </Flex>
    </Box>
  );
}
export default Settings;
