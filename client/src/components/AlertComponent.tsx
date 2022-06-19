import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import type { AlertState } from '../interface';

function AlertComponent() {
  const { alert, result }: AlertState = useSelector(
    (state: any) => state.Alert,
  );
  console.log(alert);
  if (!alert) return null;
  return (
    <Alert
      status={result ? 'success' : 'error'}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {alert}
      </AlertTitle>
    </Alert>
  );
}

export default AlertComponent;
