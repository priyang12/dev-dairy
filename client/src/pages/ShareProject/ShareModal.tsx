import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Button,
  Flex,
  Heading,
  Tooltip,
  Text,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import { useCreateToken } from '../../API/ShareProjectAPI';

function ShareModal() {
  const { id } = useParams<{ id: string }>();
  const [CreateToken, { data, isLoading }] = useCreateToken();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [Date, setDate] = useState('');
  return (
    <>
      <Button colorScheme="blue" variant="outline" w="100%" onClick={onOpen}>
        Generate Link
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className="glass" bg="transparent">
          <ModalHeader>Share Link</ModalHeader>
          <ModalCloseButton data-testid="CloseModelButton" />
          <ModalBody>
            {data && (
              <>
                <Heading fontSize="2xl">Share Link</Heading>
                <Flex
                  gap="sm"
                  alignItems="center"
                  py="sm"
                  flexDir={['column', 'row']}
                >
                  <Text
                    w="80%"
                    p={3}
                    border="2px solid"
                    borderColor="primary.500"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    http://localhost:3000/share/{data.token}
                  </Text>
                  <CopyToClipboard
                    text={`http://localhost:3000/share/${data.token}`}
                  >
                    <Button>
                      Copy
                      <Tooltip hasArrow label="Click to Copy" closeDelay={300}>
                        <span>📋</span>
                      </Tooltip>
                    </Button>
                  </CopyToClipboard>
                </Flex>
              </>
            )}
            {!data?.token && (
              <>
                <Input type="date" onChange={(e) => setDate(e.target.value)} />
                <Button
                  colorScheme="blue"
                  variant="outline"
                  w="100%"
                  isLoading={isLoading}
                  loadingText="Generating Link"
                  onClick={() =>
                    CreateToken({
                      ProjectId: id as string,
                      expireDate: Date,
                    })
                  }
                >
                  Generate Link
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShareModal;
