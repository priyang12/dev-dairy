import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  ChakraProps,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import useForm from '../Hooks/useForm';

export interface FormField {
  fieldType: string;
  fieldName: string;
  placeholder?: string;
  isRequired?: boolean;
}

type Props = {
  SubmitForm: (FormValues: any, setErrors: any) => void;
  FormFields: FormField[];
  mb?: number;
  children: React.ReactNode;
};

function Form({
  SubmitForm,
  FormFields,
  mb = 5,
  children,
  ...props
}: Props & ChakraProps) {
  const InitState = FormFields.reduce(
    (acc, curr) => ({ ...acc, [curr.fieldName]: '' }),
    {},
  );
  const { ErrorsState, HandleChange, setErrors } = useForm<any>(InitState);

  const HandleSubmit = useCallback((e: any) => {
    e.preventDefault();
    SubmitForm(e, setErrors);
  }, []);

  return (
    <Box as="form" onSubmit={HandleSubmit} {...props}>
      {FormFields.map((field) => (
        <FormControl
          mb={mb}
          isInvalid={ErrorsState[field.fieldName]}
          isRequired={field.isRequired}
          borderColor="secondary.500"
          borderWidth="2px"
          key={field.fieldName}
          backdropFilter="auto"
          backdropBlur="10px"
          borderRadius={10}
          p={5}
        >
          <FormLabel htmlFor={field.fieldName} fontSize="2xl">
            {field.fieldName[0].toUpperCase() + field.fieldName.slice(1)}
          </FormLabel>
          <Input
            id={field.fieldName}
            type={field.fieldType}
            onChange={(e: any) => {
              HandleChange(e);
            }}
          />

          {ErrorsState[field.fieldName] ? (
            <FormErrorMessage color="red" fontSize="xl">
              {ErrorsState[`${field.fieldName}`]}
            </FormErrorMessage>
          ) : (
            <FormHelperText fontSize="xl">{field.placeholder}</FormHelperText>
          )}
        </FormControl>
      ))}
      {children}
    </Box>
  );
}

Form.defaultProps = {
  mb: 5,
};

export default Form;
