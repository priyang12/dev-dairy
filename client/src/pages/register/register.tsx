import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Navigate as Redirect } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react';
import type { FormField } from '../../components/CustomForm';
import CustomForm from '../../components/CustomForm';
import {
  ConfirmPassword,
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
      fieldName: 'Confirm password',
      placeholder: 'Confirm your Password',
    },
  ];
  const RegisterUser = (FormValues: any, setErrors: any) => {
    const UsernameError = ValidateName(FormValues.name);
    const EmailError = ValidateEmail(FormValues.email);
    const PasswordError = ValidatePassword(FormValues.password);
    const ConfirmError = ConfirmPassword(
      FormValues.password,
      FormValues.password,
    );
    setErrors({
      name: UsernameError,
      email: EmailError,
      password: PasswordError,
      confirm: ConfirmError,
    });
    if (!UsernameError && !EmailError && !PasswordError && !ConfirmError) {
      registerUser(FormValues);
    } else {
      // Set Alert
    }
  };
  if (Auth.authenticated) {
    setCookie('token', Auth.token, { path: '/' });
    return <Redirect to="/feeds" />;
  }
  return (
    <Box m={['15', '100']}>
      <Flex
        className="top"
        justifyContent="space-between"
        flexDir={['column', 'column', 'row']}
      >
        <CustomForm FormFields={RegisterFields} SubmitForm={RegisterUser}>
          <Button
            isLoading={result.isLoading}
            type="submit"
            loadingText="Just a moment ..."
            colorScheme="blue"
            variant="solid"
          >
            Register
          </Button>
        </CustomForm>
        <div>
          <h1 className="display-4 text-center">Register</h1>
          <p className="text-center lead">
            Sign up for your DevConnector account
          </p>
        </div>
      </Flex>
    </Box>
  );
}

export default Register;
