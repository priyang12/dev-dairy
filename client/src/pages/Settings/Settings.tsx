import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { AiFillSetting } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { Link, Outlet } from 'react-router-dom';
import { space as ThemeSpace } from '../../Theme';
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
      w="100%"
      fontSize="3xl"
      {...props}
    >
      <Text w="100%" fontSize="2xl">
        {children}
      </Text>
    </Button>
  );
}

function Settings() {
  return (
    <Box m={['0', ThemeSpace.xl]}>
      <Flex
        justifyContent="flex-start"
        alignItems="flex-start"
        direction={['column', 'column', 'row']}
        gap={ThemeSpace.md}
      >
        <Box className="glass" p={5} m="0 auto">
          <Heading
            display={['block', 'none']}
            fontSize="5xl"
            textAlign="center"
          >
            Settings <SettingsIcon />
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
