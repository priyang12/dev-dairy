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
} from '@chakra-ui/react';
import { RegisterSchema, ZodError } from '@dev-dairy/zodvalidation';
import type { FormField } from '../../components/CustomForm';
import type { AuthState } from '../../interface';
import { StoreState } from '../../store';
import { useRegister } from '../../API/AuthAPI';
import CustomForm from '../../components/CustomForm';

function Register() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [registerUser, result] = useRegister();
  const { authenticated, token, error }: AuthState = useSelector(
    (state: StoreState) => state.Auth,
  );
  const RegisterFields: FormField[] = [
    {
      fieldType: 'text',
      fieldName: 'username',
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
    username: { value: string };
    email: { value: string };
    password: { value: string };
    ConfirmPassword: { value: string };
  }
  const RegisterUser = (
    e: React.FormEvent<HTMLFormElement> | any,
    setErrors: any,
  ) => {
    e.preventDefault();
    const { email, username, password, ConfirmPassword } = e.target
      .elements as typeof e.target.elements & FormData;
    const FormValues = {
      username: username.value,
      email: email.value,
      password: password.value,
      password2: ConfirmPassword.value,
    };
    try {
      registerUser(RegisterSchema.parse(FormValues));
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.flatten().fieldErrors;
        setErrors({
          username: errors.username,
          email: errors.email,
          password: errors.password,
          ConfirmPassword: errors.password2,
        });
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    if (authenticated) <Navigate to="/Projects" />;
  }, [authenticated]);

  if (authenticated) setCookie('token', token, { path: '/' });

  return (
    <Box
      pt={15}
      px={10}
      backgroundImage={`url(${
        localStorage.getItem('AuthImage') ||
        'https://source.unsplash.com/npwjNTG_SQA'
      })`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Heading textAlign="center">Register Page</Heading>
      <Flex
        justifyContent="space-between"
        flexDir={['column', 'column', 'row']}
      >
        {error && (
          <Alert status="error" borderRadius={10} mb={5}>
            <AlertIcon />
            {error}
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
            as={RouterLink}
            to="/login"
            colorScheme="green"
            variant="outline"
            backdropFilter="auto"
            backdropBlur="10px"
          >
            Login
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default Register;
