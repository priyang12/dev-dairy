import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
} from '@chakra-ui/react';

function ShareModal() {
  const { onClose, isOpen, onOpen } = useDisclosure();
  return (
    <>
      <Button colorScheme="blue" variant="outline" w="100%" onClick={onOpen}>
        Generate Link
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className="card" bg="transparent">
          <ModalHeader>Share Link</ModalHeader>
          <ModalCloseButton data-testid="CloseModelButton" />
          <ModalBody>
            <p>https://diary.com/123</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShareModal;
