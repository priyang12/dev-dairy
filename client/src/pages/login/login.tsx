import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import type { FormField } from '../../components/CustomForm';
import type { AuthState } from '../../interface';
import { useLoginUserMutation } from '../../API/AuthAPI';
import { ValidateEmail, ValidatePassword } from '../../utils/Validation';
import CustomForm from '../../components/CustomForm';

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [loginUser, result] = useLoginUserMutation();
  const navigate = useNavigate();
  const Auth: AuthState = useSelector((state: any) => state.Auth);

  const LoginFields: FormField[] = [
    {
      fieldType: 'email',
      fieldName: 'email',
      isRequired: true,
    },
    {
      fieldType: 'password',
      fieldName: 'password',
      isRequired: true,
    },
  ];

  const LoginUser = (e: any, setErrors: any) => {
    const FormValues = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    const EmailError = ValidateEmail(FormValues.email);
    const PasswordError = ValidatePassword(FormValues.password);
    setErrors({
      email: EmailError,
      password: PasswordError,
    });

    if (!EmailError || !PasswordError) {
      loginUser(FormValues);
    }
  };

  useEffect(() => {
    if (Auth.authenticated) {
      navigate('/Projects');
    }
  }, [Auth.authenticated, navigate]);

  if (Auth.authenticated) {
    if (Auth.token) setCookie('token', Auth.token, { path: '/' });
  }

  return (
    <Box
      p={10}
      backgroundImage="url('https://source.unsplash.com/random/?nature')"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      h="100vh"
    >
      <Flex
        justifyContent="space-between"
        flexDir={['column', 'column', 'row']}
      >
        <Flex flexDir="column">
          <Heading as="h1" fontSize="6xl" mb={5}>
            Log in
          </Heading>
          <Text as="p">Login in to your Dev Dairy account</Text>

          <Text as="p" fontSize="xl">
            Don&lsquo;t have an account?
            <Link as={RouterLink} to="/register" _hover={{ color: 'green' }}>
              <span>&nbsp;</span>
              Sign up
            </Link>
          </Text>
        </Flex>

        <Flex
          flexDir="column"
          justify="flex-end"
          width={['100%', '75%', '50%']}
        >
          {Auth.error && (
            <Alert status="error" borderRadius={10} mb={5}>
              <AlertIcon />
              {Auth.error}
            </Alert>
          )}
          <CustomForm SubmitForm={LoginUser} FormFields={LoginFields}>
            <Button
              backdropFilter="auto"
              backdropBlur="10px"
              isLoading={result.isLoading}
              type="submit"
              loadingText="Just a moment ..."
              colorScheme="green"
              variant="outline"
              w="100%"
              ml="auto"
            >
              Log In
            </Button>
          </CustomForm>

          <Link
            as={RouterLink}
            to="ResetPassword"
            fontSize={30}
            fontWeight={500}
            alignSelf="flex-end"
            _hover={{ color: 'white' }}
          >
            / Forgot Password ?
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Login;
