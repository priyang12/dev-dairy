import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component: CustomForm
import userEvent from '@testing-library/user-event';
import type { FormField } from '../CustomForm';
import CustomForm from '../CustomForm';
import {
  ValidateEmail,
  ValidateName,
  ValidatePassword,
} from '../../utils/Validation';

const FormFields: FormField[] = [
  {
    fieldType: 'text',
    fieldName: 'name',
    placeholder: 'Enter a Username',
  },
  {
    fieldType: 'text',
    fieldName: 'email',
    placeholder: 'Enter Your email',
  },
  {
    fieldType: 'text',
    fieldName: 'password',
  },
];

it('Render form', () => {
  const SubmitForm = jest.fn();
  const FormSubmitValue = 'Submit';
  render(
    <CustomForm
      loading={false}
      SubmitForm={SubmitForm}
      FormFields={FormFields}
      FormSubmitValue={FormSubmitValue}
    />,
  );

  // Check Form Fields
  FormFields.forEach((field) => {
    const input = screen.getByText(field.fieldName);
    expect(input).toBeInTheDocument();
  });

  // Check Placeholder is Auto Generated
  expect(screen.getByPlaceholderText(/Enter password/)).toBeInTheDocument();

  // Check Form Value Change
  const input = screen.getByPlaceholderText(/Enter a Username/);
  userEvent.type(input, 'Test');
  expect(input).toHaveValue('Test');

  // Check Submit Form
  userEvent.click(screen.getByText('Submit'));
  expect(SubmitForm).toHaveBeenCalledTimes(1);
});

it('Check for Validation', () => {
  const FormSubmitValue = 'Submit';
  const SubmitForm = (FormValues: any, setErrors: any): void => {
    const NameError = ValidateName(FormValues.name);
    const EmailError = ValidateEmail(FormValues.email);
    const PasswordError = ValidatePassword(FormValues.password);
    setErrors({
      name: NameError,
      email: EmailError,
      password: PasswordError,
    });
  };
  render(
    <CustomForm
      loading={false}
      SubmitForm={SubmitForm}
      FormFields={FormFields}
      FormSubmitValue={FormSubmitValue}
    />,
  );

  // Check Form Value Change
  const input = screen.getByPlaceholderText(/Enter a Username/);
  userEvent.type(input, 'Tes');
  expect(input).toHaveValue('Tes');

  // Check Submit Form
  userEvent.click(screen.getByText('Submit'));

  // Check for Error
  expect(screen.getByText(/Name must be between 4 and 10/)).toBeInTheDocument();
  expect(screen.getByText(/valid email/)).toBeInTheDocument();
  expect(screen.getByText(/Password must be at least 6 /)).toBeInTheDocument();
});
