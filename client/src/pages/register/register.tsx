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
import { RegisterSchema, ZodError } from '@dev-dairy/zodvalidation';
import type { FormField } from '../../components/CustomForm';
import type { AuthState } from '../../interface';
import { StoreState } from '../../store';
import { useRegister } from '../../API/AuthAPI';
import CustomForm from '../../components/CustomForm';
import { primary, secondary, space } from '../../Theme';
import MetaData from '../../Meta/Metaregister';

function Register() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [registerUser, result] = useRegister();
  const Navigate = useNavigate();
  const { error }: AuthState = useSelector((state: StoreState) => state.Auth);
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
    if (result.isSuccess) {
      setCookie('token', result.data.token, { path: '/' });
      Navigate('/projects');
    }
  }, [result]);

  useEffect(() => {
    if (cookies.token) Navigate('/projects');
  }, [cookies.token]);

  return (
    <>
      <MetaData />
      <Box
        p={space.lg}
        backgroundImage={`url(${'https://source.unsplash.com/npwjNTG_SQA'})`}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <Box
          fontFamily="arial"
          fontSize="4xl"
          textAlign="center"
          className="glass"
          p={space.md}
        >
          <Heading>Register Page</Heading>
          <Text>Sign up for your DevConnector account</Text>
          <Flex
            justifyContent="center"
            alignItems="center"
            gap={space.lg}
            direction={['column', 'row']}
          >
            <Text>Already have an account?</Text>
            <Button
              as={RouterLink}
              to="/login"
              colorScheme="assert"
              variant="outline"
              backdropFilter="auto"
              backdropBlur="10px"
              fontSize={space.md}
            >
              Login
            </Button>
            <Link
              as={RouterLink}
              to="/CreateTest"
              fontSize={space.lg}
              color={secondary[400]}
              _hover={{ color: primary[400], textDecoration: 'underline' }}
            >
              <span>&nbsp;</span>
              Create Test User
            </Link>
          </Flex>
        </Box>
        <>
          {error && (
            <Alert status="error" bg="red.500" borderRadius={10} my={space.md}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <CustomForm
            display={['block', 'grid']}
            gridTemplateColumns={['1fr', '1fr 1fr']}
            p={['', '', space.xl]}
            mt={space.md}
            gap={space.md}
            FormFields={RegisterFields}
            SubmitForm={RegisterUser}
          >
            <Button
              p={space.lg}
              backdropFilter="auto"
              backdropBlur="10px"
              isLoading={result.isLoading}
              type="submit"
              loadingText="Just a moment ..."
              colorScheme="assert"
              variant="outline"
              gridColumn="1 / 3"
            >
              Register Now
            </Button>
          </CustomForm>
        </>
      </Box>
    </>
  );
}

export default Register;
