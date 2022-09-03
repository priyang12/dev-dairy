import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Modal,
} from '@chakra-ui/react';

function ModalComponent({
  Title,
  onClose,
  isOpen,
  children,
}: {
  Title: string;
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{Title}</ModalHeader>
        <ModalCloseButton data-testid="CloseModelButton" />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
