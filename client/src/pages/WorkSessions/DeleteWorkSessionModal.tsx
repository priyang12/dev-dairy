import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDeleteAll } from '../../API/WorkSessionsAPI';

function DeleteWorkSessionModal() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [DeleteAll, { isLoading, isSuccess }] = useDeleteAll();
  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  return (
    <div>
      <Button
        onClick={onOpen}
        loadingText="Deleting..."
        isLoading={isLoading}
      >
        Delete Work Session
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete All Sessions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="3xl" pb={5}>
              Are you sure you want to delete all sessions?
            </Text>
            <Flex gap={5}>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  DeleteAll();
                }}
              >
                Delete
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default DeleteWorkSessionModal;
