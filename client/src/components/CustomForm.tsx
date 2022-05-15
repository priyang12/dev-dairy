/* eslint-disable no-console */
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
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
  FormSubmitValue: string;
  loading: boolean;
};

function Form({ SubmitForm, FormFields, FormSubmitValue, loading }: Props) {
  const InitState = FormFields.reduce(
    (acc, curr) => ({ ...acc, [curr.fieldName]: '' }),
    {},
  );
  const { FormValues, ErrorsState, HandleChange, setErrors } =
    useForm(InitState);

  const check = (e: any) => {
    e.preventDefault();
    SubmitForm(FormValues, setErrors);
  };

  return (
    <div>
      <form onSubmit={check}>
        {FormFields.map((field, index) => (
          <FormControl
            mb={5}
            isInvalid={ErrorsState[field.fieldName]}
            isRequired={field.isRequired}
            key={field.fieldName}
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
              <FormErrorMessage>
                {ErrorsState[`${field.fieldName}`]}
              </FormErrorMessage>
            ) : (
              <FormHelperText>{field.placeholder}</FormHelperText>
            )}
          </FormControl>
        ))}
        <Button
          isLoading={loading}
          type="submit"
          loadingText="Just a moment ..."
          colorScheme="blue"
          variant="solid"
        >
          {FormSubmitValue}
        </Button>
      </form>
    </div>
  );
}

export default Form;
