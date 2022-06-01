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
      placeholder: 'Please enter valid Email',
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
    <Box m={['15', '100']}>
      <Flex
        className="top"
        justifyContent="space-between"
        flexDir={['column', 'column', 'row']}
      >
        <Flex flexDir="column">
          <Heading as="h1" fontSize="6xl" mb={5}>
            Log in
          </Heading>
          <Text as="p">Login in to your DevConnector account</Text>
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
              isLoading={result.isLoading}
              type="submit"
              loadingText="Just a moment ..."
              colorScheme="blue"
              variant="solid"
            >
              Log In
            </Button>
          </CustomForm>

          <Link
            as={RouterLink}
            to="ResetPassword"
            className="black-text"
            fontSize={30}
            fontWeight={500}
            alignSelf="flex-end"
            _hover={{ color: 'teal.600' }}
          >
            / Forgot Password ?
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Login;