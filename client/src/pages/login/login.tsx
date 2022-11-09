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
import BgImage from '../../components/BgImage';
import { assert, primary, space } from '../../Theme';

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
    <BgImage
      p={10}
      BgImageData={{
        url: `https://source.unsplash.com/npwjNTG_SQA`,
      }}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      h={['100%', '100%', '100%', '100%', '100vh']}
    >
      <Flex
        justifyContent="space-between"
        flexDir={['column', 'column', 'row']}
        gap={space.sm}
      >
        <Flex flexDir="column" className="glass" p={space.md}>
          <Heading
            as="h1"
            fontSize={[space.xl, space['2xl'], space['3xl']]}
            mb={space.md}
          >
            Log in
          </Heading>
          <Text as="p" fontSize={space.lg}>
            Login in to your Dev Dairy account
          </Text>

          <Text as="p" fontSize={space.md}>
            Don&lsquo;t have an account?
            <Link
              as={RouterLink}
              to="/register"
              fontSize={space.xl}
              color={assert[600]}
              _hover={{ color: primary[400], textDecoration: 'underline' }}
            >
              <span>&nbsp;</span>
              Sign up
            </Link>
          </Text>
        </Flex>

        <Flex flexDir="column" justify="center" width={['100%', '75%', '50%']}>
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
              colorScheme="assert"
              variant="outline"
              w="100%"
              ml="auto"
            >
              Log In
            </Button>
          </CustomForm>

          <Link
            as={RouterLink}
            to="/ForgotPassword"
            fontSize={30}
            fontWeight={500}
            alignSelf="flex-end"
            color={assert[300]}
            _hover={{ color: primary[400], textDecoration: 'underline' }}
          >
            / Forgot Password ?
          </Link>
        </Flex>
      </Flex>
    </BgImage>
  );
}

export default Login;
