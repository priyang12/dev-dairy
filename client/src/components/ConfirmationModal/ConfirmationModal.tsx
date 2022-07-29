import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

type Prop = {
  Title: string;
  Action: any;
  Result: any;
  children: React.ReactNode;
};

function ConfirmationModal({ Title, Action, Result, children }: Prop) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (Result.success) {
      onClose();
    }
  }, [Result]);

  const Submit = (e: any) => {
    e.preventDefault();
    const FormValues = e.target.elements;
    const { Confirm } = FormValues;

    if (Confirm.value === `${Title} Confirm`) {
      Action();
    } else {
      // alert('Wrong Confirmation');
    }
  };
  return (
    <>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          onClick: onOpen,
        }),
      )}
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{Title} Confirm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={Submit}>
              <FormControl>
                <FormLabel htmlFor="Confirm">
                  <Text>Are you sure you want to delete {Title}?</Text>
                </FormLabel>
                <Input
                  my={5}
                  type="text"
                  name="Confirm"
                  id="Confirm"
                  placeholder={`Type ${Title} Confirm`}
                />
              </FormControl>
              <Button
                colorScheme="red"
                w="100%"
                type="submit"
                variant="outline"
                _hover={{
                  bg: 'red',
                  color: 'white',
                }}
                isLoading={Result.isLoading}
                loadingText="Deleting..."
              >
                Delete
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
