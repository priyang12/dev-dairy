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
import { LoginSchema, ZodError } from '@dev-dairy/zodvalidation';
import type { FormField } from '../../components/CustomForm';
import type { AuthState } from '../../interface';
import { useLogin } from '../../API/AuthAPI';
import CustomForm from '../../components/CustomForm';

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [loginUser, result] = useLogin();
  const Navigate = useNavigate();
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
    try {
      loginUser(LoginSchema.parse(FormValues));
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error.flatten().fieldErrors);
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    if (result.isSuccess) {
      setCookie('token', result.data.token, { path: '/' });
      Navigate('/posts');
    }
  }, [result]);

  useEffect(() => {
    if (cookies.token) {
      Navigate('/posts');
    }
  }, [cookies.token]);

  return (
    <Box
      p={10}
      backgroundImage={`url(${
        localStorage.getItem('AuthImage') ||
        'https://source.unsplash.com/npwjNTG_SQA'
      })`}
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
