import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetUserQuery, useUpdateUser } from '../../API/UserAPI';
import Container from '../../components/Container';
import Spinner from '../../components/spinner';
import { ResetPasswordSchema, z, ZodError } from '@dev-dairy/zodvalidation';
import { space } from '../../Theme';
import { Link } from 'react-router-dom';

interface FormType {
  password: { value: string };
  password2: { value: string };
}

function ChangePassword() {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [InputError, setInputError] = useState({
    password: '',
    password2: '',
  });
  const { isLoading, isSuccess, isError, error } = useGetUserQuery(undefined, {
    skip: !id,
  });

  const [UpdatePassword, UpdateResult] = useUpdateUser();

  useEffect(() => {
    if (id) {
      setCookie('token', id, { path: '/' });
    }
  }, [id]);

  if (isLoading) return <Spinner />;
  if (isError) {
    // @ts-ignore
    toast.error(error.data.message);
    Navigate('/');
  }

  const onSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { password, password2 } = e.target as typeof e.target & FormType;
    try {
      UpdatePassword(
        ResetPasswordSchema.parse({
          password: password.value,
          password2: password2.value,
        }),
      );
      setInputError({
        password: '',
        password2: '',
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setInputError(error.flatten().fieldErrors as any);
      } else {
        throw error;
      }
    }
  };

  return (
    <Container>
      {isSuccess && (
        <Box my={space['xl']}>
          <Heading textAlign="center">Change Password</Heading>
          {UpdateResult.isSuccess && (
            <Button as={Link} to="/posts">
              Go To Home
            </Button>
          )}
          <Flex
            direction="column"
            as="form"
            onSubmit={onSubmit}
            gap={space.lg}
            p={space['xl']}
          >
            <FormControl isInvalid={!!InputError.password}>
              <FormLabel htmlFor="password">password</FormLabel>
              <Input name="password" id="password" type="password" />
              {!InputError['password'] ? (
                <FormHelperText>
                  Please choose a strong password to keep it safe
                </FormHelperText>
              ) : (
                <FormErrorMessage>{InputError['password']}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!InputError.password2}>
              <FormLabel htmlFor="password2">Confirm Password</FormLabel>
              <Input name="password2" id="password2" type="password" />
              {!InputError['password2'] ? (
                <FormHelperText>Passwords must be match</FormHelperText>
              ) : (
                <FormErrorMessage>{InputError['password2']}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={UpdateResult.isLoading}
              loadingText="Submitting Password"
              type="submit"
            >
              Reset Password
            </Button>
          </Flex>
        </Box>
      )}
    </Container>
  );
}
export default ChangePassword;
