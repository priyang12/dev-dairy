import { useState } from 'react';

const useForm = (initialState: any) => {
  const [FormValues, setFormValues] = useState(initialState);
  const [ErrorsState, setErrorsState] = useState(initialState);

  const HandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;

    if (value === '') {
      setErrorsState({
        ...ErrorsState,
        [id]: `${id.toUpperCase()} is required`,
      });
    } else setErrorsState({ ...ErrorsState, [id]: null });

    setFormValues({ ...FormValues, [id]: value });
  };
  const SetState = (NewState: any) => {
    setFormValues(NewState);
  };
  const setErrors = (ErrorState: any) => {
    setErrorsState(ErrorState);
  };
  const setError = (field: any, message: string) => {
    console.log(field, message);
    setErrorsState((CurrentState: any) => ({
      ...CurrentState,
      [field]: message,
    }));
    if (message === '') {
      return false;
    }
    return true;
  };

  return {
    FormValues,
    HandleChange,
    SetState,
    ErrorsState,
    setErrors,
    setError,
  };
};
export default useForm;
