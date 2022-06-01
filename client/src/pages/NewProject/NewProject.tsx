import { AddIcon, ArrowForwardIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Textarea,
  Flex,
  Button,
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { useState } from 'react';

import useForm from '../../Hooks/useForm';

function NewProject() {
  const [NewTech, setNewTech] = useState('');
  const [Technologies, setTechnologies] = useState<any[]>([]);
  const AddNewTech = (e: FormEvent) => {
    e.preventDefault();
    setTechnologies([...Technologies, NewTech]);
    setNewTech('');
  };
  const DeleteTech = (index: number) => {
    const newTechs = [...Technologies];
    newTechs.splice(index, 1);
    setTechnologies(newTechs);
  };
  const { FormValues, ErrorsState, HandleChange, setErrors, SetState } =
    useForm({
      Title: '',
      Description: '',
      process: 5,
    });

  const ProcessChange = (value: number | any) => {
    SetState((prevState: any) => ({
      ...prevState,
      process: value,
    }));
  };
  return (
    <Container className="top" maxW="1000px" pb={10}>
      <Heading size="lg">New Project</Heading>
      <Flex
        direction={['column', 'column', 'row']}
        justifyContent="space-between"
        gap={5}
      >
        <Flex w="100%" as="form" direction="column" gap={5}>
          <FormControl isRequired>
            <FormLabel htmlFor="Title">Title : </FormLabel>
            <Input
              id="Title"
              placeholder="Pick Good Project Title"
              value={FormValues.title}
              onChange={HandleChange}
              required
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="Description">Description : </FormLabel>
            <Textarea
              id="Description"
              placeholder=" Project Description"
              rows={10}
              onChange={HandleChange}
              required
            />
            <FormHelperText>
              Write a thoroughly Description for your project
            </FormHelperText>
          </FormControl>

          <FormControl isRequired gap={5}>
            <FormLabel htmlFor="Process">Process</FormLabel>
            <NumberInput
              maxW="100px"
              mr="2rem"
              value={FormValues.process}
              onChange={ProcessChange}
              min={0}
              max={100}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              aria-label="slider-ex-3"
              defaultValue={30}
              flex="1"
              focusThumbOnChange={false}
              value={FormValues.process}
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
        </Flex>
        <Flex
          w="50%"
          as="form"
          onSubmit={AddNewTech}
          gap={5}
          direction="column"
        >
          <FormControl>
            <FormLabel>Technologies</FormLabel>
            <Flex gap={5}>
              <Input
                id="Technologies"
                placeholder="Pick Good Project Title"
                value={NewTech}
                onChange={(e) => {
                  setNewTech(e.target.value);
                }}
              />
              <Button
                type="submit"
                loadingText="Just a moment ..."
                colorScheme="blue"
                variant="solid"
              >
                <AddIcon color="white" />
              </Button>
            </Flex>
          </FormControl>
          {Technologies.map((tech: any, index) => (
            <Flex alignItems="center" gap={5}>
              <Input value={tech} bg="blue.800" />
              <DeleteIcon
                color="red"
                cursor="pointer"
                onClick={() => {
                  DeleteTech(index);
                }}
              />
            </Flex>
          ))}
          <FormControl>
            <FormLabel htmlFor="RoadMap">RoadMap</FormLabel>
          </FormControl>
        </Flex>
      </Flex>
    </Container>
  );
}

export default NewProject;
