import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  Box,
  Flex,
  Heading,
  Link,
  Text
} from '@chakra-ui/react';
import type { FormField } from '../components/CustomForm';
import CustomForm from '../components/CustomForm';
import { LoginAction } from '../actions/AuthAction';
import type { AlertState, AuthState } from '../actions/interfaces';
import { ValidateEmail, ValidatePassword } from '../utils/Validation';
import Spinner from '../components/spinner';

function Login() {
  const AuthState: AuthState = useSelector((state: any) => state.Auth);
  const { loading, alert }: AlertState = useSelector(
    (state: any) => state.Alert
  );

  const { isAuth } = AuthState;

  const dispatch = useDispatch();
  const LoginFields: FormField[] = [
    {
      fieldType: 'email',
      fieldName: 'email',
      placeholder: 'Please enter valid Email',
      isRequired: true
    },
    {
      fieldType: 'password',
      fieldName: 'password',
      isRequired: true
    }
  ];

  const LoginUser = (FormValues: any, setErrors: any) => {
    const EmailError = ValidateEmail(FormValues.email);
    const PasswordError = ValidatePassword(FormValues.password);
    setErrors({
      email: EmailError,
      password: PasswordError
    });

    if (!EmailError || !PasswordError) {
      dispatch(LoginAction(FormValues));
    }
  };
  if (isAuth) {
    return <Navigate to="/feeds" />;
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
          {alert && (
            <Alert status="error" borderRadius={10} mb={5}>
              <AlertIcon />
              {alert}
            </Alert>
          )}
          <CustomForm
            SubmitForm={LoginUser}
            FormFields={LoginFields}
            FormSubmitValue="Log In"
            loading={!!loading}
          />

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
