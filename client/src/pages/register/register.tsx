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
import type { FormField } from '../../components/CustomForm';
import CustomForm from '../../components/CustomForm';
import {
  ConfirmPasswordCheck,
  ValidateEmail,
  ValidateTitle,
  ValidatePassword,
} from '../../utils/Validation';
import { useRegister } from '../../API/AuthAPI';
import type { AuthState } from '../../interface';
import { StoreState } from '../../store';

function Register() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [registerUser, result] = useRegister();
  const { authenticated, token, error }: AuthState = useSelector(
    (state: StoreState) => state.Auth,
  );
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
      placeholder:
        'Enter a Strong Password with at least 6 characters',
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

    const {
      email, name, password, ConfirmPassword,
    } = e.target
      .elements as typeof e.target.elements & FormData;

    const UsernameError = ValidateTitle(name.value);
    const EmailError = ValidateEmail(email.value);
    const PasswordError = ValidatePassword(password.value);
    const ConfirmError = ConfirmPasswordCheck(
      password.value,
      ConfirmPassword.value,
    );

    if (
      !UsernameError
      && !EmailError
      && !PasswordError
      && !ConfirmError
    ) {
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
    if (authenticated) {
      <Navigate to="/Projects" />;
    }
  }, [authenticated]);
  if (authenticated) {
    setCookie('token', token, { path: '/' });
  }
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
        <CustomForm
          FormFields={RegisterFields}
          SubmitForm={RegisterUser}
        >
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
