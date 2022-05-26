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

import ModalComponent from './ModalComponent';

interface Props {
  onSubmit: any;
  result: any;
  projectId: any;
}

function RoadMapModal({ onSubmit, result, projectId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const FormSubmit = (e: any) => {
    e.preventDefault();
    const { name, color } = e.target.elements;

    if (name === '') {
      console.log('name is empty');
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
            <FormControl mb={5}>
              <FormLabel htmlFor="name">RoadMap Name</FormLabel>
              <Input id="name" type="text" />
              <FormHelperText>
                Give Abstracted name to RoadMap like frontend, backend
              </FormHelperText>
            </FormControl>
            <FormControl mb={5}>
              <FormLabel htmlFor="color">Pick a Good Color</FormLabel>
              <Input id="color" type="color" />
            </FormControl>
            <ModalFooter>
              <Button
                isLoading={result.isLoading}
                type="submit"
                loadingText="Just a moment..."
                colorScheme="blue"
                variant="solid"
              >
                Add RoadMap
              </Button>
            </ModalFooter>
          </form>
        </Box>
      </ModalComponent>
    </div>
  );
}

export default RoadMapModal;
