import {
  Alert,
  AlertIcon,
  AlertTitle,
  useDisclosure,
  CloseButton,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { clearAlert } from '../features/AlertSlice';

import type { AlertState } from '../interface';

function AlertComponent() {
  const Dispatch = useDispatch();
  const { alert, Type }: AlertState = useSelector((state: any) => state.Alert);
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });
  const ClearAlert = () => {
    Dispatch(clearAlert());
    onClose();
  };
  if (!alert || !isVisible) return null;

  return (
    <Alert
      status={Type || 'info'}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      mt={5}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {alert}
      </AlertTitle>
      <CloseButton
        position="absolute"
        right={-1}
        top={-1}
        m={5}
        p={5}
        border="2px solid"
        borderColor="secondary.200"
        _hover={{
          bg: 'secondary.300',
        }}
        onClick={ClearAlert}
      />
    </Alert>
  );
}

export default AlertComponent;
