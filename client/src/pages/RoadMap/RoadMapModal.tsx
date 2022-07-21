import {
  Button,
  useDisclosure,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  ModalFooter,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';

import ModalComponent from '../../components/ModalComponent';

interface Props {
  onSubmit: any;
  projectId: any;
}

function RoadMapModal({ onSubmit, projectId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roadMapError, setRoadMapError] = useState('');
  const FormSubmit = (e: any) => {
    e.preventDefault();
    const { name, color } = e.target.elements;
    if (name.value === '') {
      setRoadMapError('Please enter a RoadMap name');
    } else {
      onSubmit({
        projectId,
        roadMapData: {
          name: name.value,
          color: color.value,
        },
      });
      onClose();
    }
  };

  return (
    <div>
      <Button colorScheme="blue" variant="outline" onClick={onOpen} ml={5}>
        Add New RoadMap
      </Button>
      <ModalComponent Title="Add New RoadMap" isOpen={isOpen} onClose={onClose}>
        <Box>
          <form onSubmit={FormSubmit}>
            <FormControl mb={5} isInvalid={!!roadMapError}>
              <FormLabel htmlFor="name">RoadMap Name</FormLabel>
              <Input id="name" type="text" />
              <FormHelperText>
                Give Abstracted name to RoadMap like frontend, backend
              </FormHelperText>
              <FormErrorMessage>{roadMapError}</FormErrorMessage>
            </FormControl>
            <FormControl mb={5}>
              <FormLabel htmlFor="color">Pick a Good Color</FormLabel>
              <Input id="color" type="color" />
            </FormControl>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" variant="solid">
                Submit RoadMap
              </Button>
            </ModalFooter>
          </form>
        </Box>
      </ModalComponent>
    </div>
  );
}

export default RoadMapModal;
