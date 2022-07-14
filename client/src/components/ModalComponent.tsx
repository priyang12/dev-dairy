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
    <div>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{Title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalComponent;
