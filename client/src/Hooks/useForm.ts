import { useState } from 'react';

const useForm = (initialState: any) => {
  const [FormValues, setFormValues] = useState(initialState);
  const [ErrorsState, setErrorsState] = useState(initialState);

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === '') {
      setErrorsState({
        ...ErrorsState,
        [name]: `${name.toUpperCase()} is required`,
      });
    } else setErrorsState({ ...ErrorsState, [name]: null });

    setFormValues({ ...FormValues, [name]: value });
  };
  const SetState = (NewState: any) => {
    setFormValues(NewState);
  };
  const setErrors = (ErrorState: any) => {
    setErrorsState(ErrorState);
  };
  // Pass Init State
  // Pass Change State for on change event
  // Pass SetErrorState for set error state
  // Pass Set State for set state to null of init

  return {
    FormValues,
    HandleChange,
    SetState,
    ErrorsState,
    setErrors,
  };
};
export default useForm;
