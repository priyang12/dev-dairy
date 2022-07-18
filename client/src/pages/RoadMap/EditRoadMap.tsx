import { ArrowForwardIcon } from '@chakra-ui/icons';
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useEditRoadMapMutation } from '../../API/ProjectAPI';

import ModalComponent from '../../components/ModalComponent';
import type { IRoadMap } from '../../interface';

function ProgressInput({
  progress,
  ProcessChange,
}: {
  progress: number | undefined;
  ProcessChange: any;
}) {
  return (
    <FormControl isRequired gap={5}>
      <FormLabel htmlFor="Process">RoadMap Progress</FormLabel>
      <NumberInput
        maxW="100px"
        mr="2rem"
        id="Process"
        value={progress}
        onChange={ProcessChange}
        min={0}
        max={100}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper data-testid="Process-Id" />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        aria-label="slider-ex-3"
        defaultValue={30}
        flex="1"
        focusThumbOnChange={false}
        value={progress}
        onChange={ProcessChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <Box color="tomato" as={ArrowForwardIcon} />
        </SliderThumb>
      </Slider>
    </FormControl>
  );
}

function EditRoadMap({
  ProjectID,
  RoadMap,
}: {
  ProjectID: string;
  RoadMap: IRoadMap;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roadMapError, setRoadMapError] = useState('');
  const [Progress, setProgress] = useState(RoadMap.progress);
  const [EditRoadMapCall, { isSuccess, isLoading }] = useEditRoadMapMutation();

  useEffect(() => {
    if (isSuccess && isOpen) {
      onClose();
    }
  }, [isSuccess, isOpen, onClose]);

  const FormSubmit = (e: any) => {
    e.preventDefault();
    const { name, color } = e.target.elements;
    if (name.value === '') {
      setRoadMapError('Please enter a RoadMap name');
    } else {
      EditRoadMapCall({
        ProjectID,
        roadMapData: {
          _id: RoadMap._id,
          name: name.value,
          color: color.value,
          progress: Progress,
        },
      });
    }
  };
  const ProcessChange = (value: number | any) => {
    setProgress(value);
  };

  return (
    <div>
      <Button colorScheme="green" variant="outline" onClick={onOpen} ml={5}>
        Edit {RoadMap.name}
      </Button>
      <ModalComponent Title="Edit RoadMap" isOpen={isOpen} onClose={onClose}>
        <Box>
          <form onSubmit={FormSubmit}>
            <FormControl mb={5} isInvalid={!!roadMapError}>
              <FormLabel htmlFor="name">RoadMap Name</FormLabel>
              <Input id="name" type="text" defaultValue={RoadMap.name} />
              <FormHelperText>
                Give Abstracted name to RoadMap like frontend, backend
              </FormHelperText>
              <FormErrorMessage>{roadMapError}</FormErrorMessage>
            </FormControl>
            <FormControl mb={5}>
              <FormLabel htmlFor="color">Pick a Good Color</FormLabel>
              <Input id="color" type="color" defaultValue={RoadMap.color} />
            </FormControl>
            <ProgressInput ProcessChange={ProcessChange} progress={Progress} />
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                variant="solid"
                isLoading={isLoading}
                loadingText="Updating RoadMap"
              >
                Update RoadMap
              </Button>
            </ModalFooter>
          </form>
        </Box>
      </ModalComponent>
    </div>
  );
}

export default EditRoadMap;
