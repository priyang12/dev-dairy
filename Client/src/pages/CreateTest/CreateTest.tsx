import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BgImage from '../../components/BgImage';
import { v4 as uuidv4 } from 'uuid';
import { useGetTestTokens, useRegisterTestUser } from '../../API/TestUserAPI';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { space } from '../../Theme';
import { useApiToast } from '../../Hooks/useApiToast';
import MetaCreateTest from '../../Meta/MetaCreateTest';

const Data = {
  Description:
    'Make Your Test User Account with Mocked Data Filled In, you can play around with the mock data and keep the account if you want.',
  Alert: 'Note- Your Data and this account will be Delete in one day',
};

function CreateTest() {
  const Navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const TestId = localStorage.getItem('TestID');
  const { data } = useGetTestTokens(TestId as string, {
    skip: !TestId,
  });

  const [RegisterMutation, result] = useRegisterTestUser();

  useApiToast({
    Result: result,
    loadingMessage: 'Making Test User',
    toastProps: {
      position: 'bottom-center',
    },
  });

  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  useEffect(() => {
    if (data?.token) {
      setCookie('token', data?.token, { path: '/' });
      Navigate('/posts');
    }
  }, [data?.token]);

  useEffect(() => {
    if (cookies.token) Navigate('/posts');
  }, [cookies.token]);

  const CreateTestAccount = () => {
    const UUID = uuidv4();
    RegisterMutation({
      UUID,
    });
  };

  return (
    <BgImage
      BgImageData={{
        url: 'https://source.unsplash.com/npwjNTG_SQA',
      }}
      minH="100vh"
    >
      <MetaCreateTest />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="glass"
          bg="transparent"
          borderRadius={space.md}
        >
          <ModalHeader>Test User</ModalHeader>
          <ModalCloseButton
            onClick={() => Navigate('/register')}
            data-testid="CloseModal"
          />
          <ModalBody>{Data.Description}</ModalBody>
          <ModalBody color={'red'} fontSize="2xl">
            {Data.Alert}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              colorScheme={'assert'}
              loadingText="Please Wait"
              isLoading={result.isLoading}
              onClick={() => CreateTestAccount()}
            >
              Make Test Data
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </BgImage>
  );
}

export default CreateTest;
