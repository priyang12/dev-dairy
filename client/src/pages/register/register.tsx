import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Navigate, Navigate as Redirect } from 'react-router-dom';
import { Alert, AlertIcon, Box, Button, Flex } from '@chakra-ui/react';
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
        name: name.value,
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
    <Box m={['15', '100']}>
      <Flex
        className="top"
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
            isLoading={result.isLoading}
            type="submit"
            loadingText="Just a moment ..."
            colorScheme="blue"
            variant="solid"
          >
            Register Now
          </Button>
        </CustomForm>
        <div>
          <h1 className="display-4 text-center">Register your self</h1>
          <p className="text-center lead">
            Sign up for your DevConnector account
          </p>
        </div>
      </Flex>
    </Box>
  );
}

export default Register;
