import { useCallback, useState } from 'react';

const useForm = <T>(
  initialState: T,
): {
  FormValues: T;
  HandleChange: (event: React.ChangeEvent<any>) => void;
  setFormValues: React.Dispatch<React.SetStateAction<T>>;
  SetState: (FormValues: T) => void;
  ErrorsState: T;
  setErrors: (ErrorsState: T) => void;
  setError: any;
} => {
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
  const SetState = useCallback((NewState: T) => {
    setFormValues(NewState);
  }, []);
  const setErrors = useCallback((ErrorState: T) => {
    setErrorsState(ErrorState);
  }, []);
  const setError = (field: any, message: string) => {
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
    setFormValues,
    SetState,
    setErrors,
    setError,
    ErrorsState,
  };
};
export default useForm;
