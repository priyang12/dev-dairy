import { useDispatch, useSelector } from 'react-redux';
import { Navigate as Redirect } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import type { FormField } from '../components/CustomForm';
import type { AlertState, AuthState } from '../actions/interfaces';
import CustomForm from '../components/CustomForm';
import {
  ConfirmPassword,
  ValidateEmail,
  ValidateName,
  ValidatePassword,
} from '../utils/Validation';
import { RegisterUserAction } from '../actions/AuthAction';

function Register() {
  const Auth: AuthState = useSelector((state: any) => state.Auth);
  const { loading }: AlertState = useSelector((state: any) => state.Alert);
  const { isAuth } = Auth;
  const dispatch = useDispatch();
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
      dispatch(RegisterUserAction(FormValues));
    } else {
      // Set Alert
    }
  };
  if (isAuth) {
    return <Redirect to="/createProfile" />;
  }
  return (
    <Box m={['15', '100']}>
      <Flex
        className="top"
        justifyContent="space-between"
        flexDir={['column', 'column', 'row']}
      >
        <CustomForm
          FormFields={RegisterFields}
          SubmitForm={RegisterUser}
          FormSubmitValue="Register"
          loading={!!loading}
        />
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
