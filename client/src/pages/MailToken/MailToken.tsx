import { Alert, AlertIcon, Flex, Button } from '@chakra-ui/react';
import { FormControl, Input, Label } from '@priyang/react-component-lib';
import { useSelector } from 'react-redux';
import { useSendToken } from '../../API/AuthAPI';
import Container from '../../components/Container';
import { StoreState } from '../../store';
import { assert, space } from '../../Theme';
import MetaData from '../../Meta/MetaMailToken';

function MailToken() {
  const { error } = useSelector((state: StoreState) => state.Auth);
  const [SendToken, SendTokenResult] = useSendToken();

  const OnSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    // @ts-ignore
    SendToken(e.target.elements.Email.value);
  };

  return (
    <>
      <MetaData />

      <Container my={space['2xl']}>
        {error && (
          <Alert status="error" bg="red.500" borderRadius={10} my={space.md}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {SendTokenResult.isSuccess && (
          <Alert
            status="success"
            bg="green.500"
            borderRadius={10}
            my={space.md}
          >
            <AlertIcon />
            {SendTokenResult.data.message}
          </Alert>
        )}
        <Flex
          direction={['column', 'row']}
          as="form"
          onSubmit={OnSubmit}
          gap={space.md}
        >
          <FormControl width="100%">
            <Label color={assert[600]} htmlFor="Email">
              Enter Your Email Address
            </Label>
            <Input
              id="Email"
              name="Email"
              InputSize="large"
              type="email"
              bg="primary.800"
              color={assert[600]}
              width="100%"
            />
          </FormControl>
          <Button
            w={['50%', 'fit-content']}
            type="submit"
            colorScheme="assert"
            isLoading={SendTokenResult.isLoading}
            loadingText="Sending Token"
            alignSelf={['center', 'flex-end']}
            mb={2}
          >
            Submit
          </Button>
        </Flex>
      </Container>
    </>
  );
}
export default MailToken;
