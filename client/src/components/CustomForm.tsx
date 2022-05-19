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
  // eslint-disable-next-line react/require-default-props
  mb?: number;
  children: React.ReactNode;
};

function Form({ SubmitForm, FormFields, mb = 5, children }: Props) {
  const InitState = FormFields.reduce(
    (acc, curr) => ({ ...acc, [curr.fieldName]: '' }),
    {},
  );

  const { ErrorsState, HandleChange, setErrors } = useForm(InitState);

  const check = (e: any) => {
    e.preventDefault();
    SubmitForm(e, setErrors);
  };

  return (
    <div>
      <form onSubmit={check}>
        {FormFields.map((field, index) => (
          <FormControl
            mb={mb}
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
        {children}
      </form>
    </div>
  );
}

export default Form;
