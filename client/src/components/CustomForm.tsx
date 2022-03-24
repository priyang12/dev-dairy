import { useForm } from "../utils/hooks";

export interface FormField {
  fieldType: string;
  fieldName: string;
  placeholder?: string;
}

type Props = {
  SubmitForm: (FormValues: any, setErrors: any) => void;
  FormFields: FormField[];
  FormSubmitValue: string;
};

const Form = ({ SubmitForm, FormFields, FormSubmitValue }: Props) => {
  const InitState = FormFields.reduce(
    (acc, curr) => ({ ...acc, [curr.fieldName]: "" }),
    {}
  );
  const { FormValues, HandleChange, ErrorsState, setErrors } = useForm(
    InitState
  );

  const check = (e: any) => {
    e.preventDefault();
    SubmitForm(FormValues, setErrors);
  };

  return (
    <div>
      <form onSubmit={check} className='mx-3'>
        {FormFields.map((field, index) => (
          <div className='form-group' key={index}>
            <label htmlFor={field.fieldName}>{field.fieldName}</label>
            <input
              type={field.fieldType}
              className='form-control'
              placeholder={field?.placeholder || `Enter ${field.fieldName}`}
              name={field.fieldName}
              value={FormValues[`${field.fieldName}`]}
              onChange={HandleChange}
            />
            <div className='text-danger'>
              {ErrorsState[`${field.fieldName}`]
                ? ErrorsState[`${field.fieldName}`]
                : ""}
            </div>
          </div>
        ))}

        <input
          type='submit'
          className='btn btn-info mx-3'
          value={FormSubmitValue}
        />
      </form>
    </div>
  );
};

export default Form;
