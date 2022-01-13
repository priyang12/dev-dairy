import { useForm } from "../utils/hooks";

type Props = {
  onSubmit: (e: React.FormEvent) => void;
};

const Form = ({ onSubmit }: Props) => {
  const {
    FormValues,
    HandleChange,
    SetState,
    ErrorsState,
    setErrors,
  } = useForm({
    email: "",
    password: "",
  });
  const fields = {};
  return (
    <div>
      <form onSubmit={onSubmit} className='mx-3'>
        <div className='form-group'>
          <input
            type='email'
            className='form-control'
            placeholder=' Enter email'
            name='email'
            value={FormValues.email}
            onChange={HandleChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            placeholder=' Enter Password'
            name='password'
            value={FormValues.password}
            onChange={HandleChange}
          />
        </div>

        <input type='submit' className='btn btn-info mx-3' value='Submit' />
      </form>
    </div>
  );
};

export default Form;
