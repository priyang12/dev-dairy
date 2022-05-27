import {
  Button,
  useDisclosure,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  ModalFooter,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import ModalComponent from './ModalComponent';

interface Props {
  onSubmit: any;
  result: any;
  projectId: any;
}

function DeleteRoadMapModal({ onSubmit, result, projectId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button colorScheme="red" variant="outline" onClick={onOpen} ml={5}>
        Delete RoadMap
      </Button>
      <ModalComponent Title="Add New RoadMap" isOpen={isOpen} onClose={onClose}>
        <Box>asdasd</Box>
      </ModalComponent>
    </div>
  );
}

export default DeleteRoadMapModal;
