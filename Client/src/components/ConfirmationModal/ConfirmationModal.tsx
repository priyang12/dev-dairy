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
  OnSubmit: any;
  Result: any;
  placeholder?: string;
  children: React.ReactNode;
};

function ConfirmationModal({
  Title,
  placeholder,
  OnSubmit,
  Result,
  children,
}: Prop) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (Result.isSuccess) {
      onClose();
    }
  }, [Result]);

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
          <ModalHeader>Confirm {Title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={OnSubmit}>
              <FormControl>
                <FormLabel htmlFor="Confirm">
                  <Text>Are you sure you want to delete {Title}?</Text>
                </FormLabel>
                <Input
                  data-testid="confirm-input"
                  my={5}
                  type="text"
                  name="Confirm"
                  id="Confirm"
                  placeholder={placeholder || `Type ${Title} Confirm`}
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
