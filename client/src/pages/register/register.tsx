import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import type { FormField } from '../../components/CustomForm';
import CustomForm from '../../components/CustomForm';
import {
  ConfirmPasswordCheck,
  ValidateEmail,
  ValidateName,
  ValidatePassword,
} from '../../utils/Validation';
import { useRegisterUserMutation } from '../../API/AuthAPI';
import type { AuthState } from '../../interface';

function Register() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [registerUser, result] = useRegisterUserMutation();
  const Auth: AuthState = useSelector((state: any) => state.Auth);
  const RegisterFields: FormField[] = [
    {
      fieldType: 'text',
      fieldName: 'name',
      placeholder: 'Pick a Cool Nickname',
    },
    {
      fieldType: 'email',
      fieldName: 'email',
      placeholder: 'We never share your email',
    },
    {
      fieldType: 'password',
      fieldName: 'password',
      placeholder: 'Enter a Strong Password with at least 6 characters',
    },
    {
      fieldType: 'password',
      fieldName: 'ConfirmPassword',
      placeholder: 'Confirm your Password',
    },
  ];
  interface FormData {
    name: { value: string };
    email: { value: string };
    password: { value: string };
    ConfirmPassword: { value: string };
  }
  const RegisterUser = (
    e: React.FormEvent<HTMLFormElement> | any,
    setErrors: any,
  ) => {
    e.preventDefault();

    const { email, name, password, ConfirmPassword } = e.target
      .elements as typeof e.target.elements & FormData;

    const UsernameError = ValidateName(name.value);
    const EmailError = ValidateEmail(email.value);
    const PasswordError = ValidatePassword(password.value);
    const ConfirmError = ConfirmPasswordCheck(
      password.value,
      ConfirmPassword.value,
    );

    if (!UsernameError && !EmailError && !PasswordError && !ConfirmError) {
      registerUser({
        username: name.value,
        email: email.value,
        password: password.value,
        password2: ConfirmPassword.value,
      });
    } else {
      setErrors({
        name: UsernameError,
        email: EmailError,
        password: PasswordError,
        ConfirmPassword: ConfirmError,
      });
    }
  };
  useEffect(() => {
    if (Auth.authenticated) {
      <Navigate to="/Projects" />;
    }
  }, [Auth.authenticated]);
  if (Auth.authenticated) {
    setCookie('token', Auth.token, { path: '/' });
  }
  return (
    <Box
      pt={15}
      px={10}
      backgroundImage="url('https://source.unsplash.com/random/?nature')"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Heading textAlign="center">Register Page</Heading>
      <Flex
        justifyContent="space-between"
        flexDir={['column', 'column', 'row']}
      >
        {Auth.error && (
          <Alert status="error" borderRadius={10} mb={5}>
            <AlertIcon />
            {Auth.error}
          </Alert>
        )}
        <CustomForm FormFields={RegisterFields} SubmitForm={RegisterUser}>
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
            Register Now
          </Button>
        </CustomForm>
        <Box fontFamily="arial" fontSize="4xl" mt={20}>
          <Text>Sign up for your DevConnector account</Text>
          <Text>Already have an account?</Text>
          <Button
            colorScheme="green"
            variant="outline"
            backdropFilter="auto"
            backdropBlur="10px"
          >
            <Link as={RouterLink} to="/login">
              Login
            </Link>
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default Register;
