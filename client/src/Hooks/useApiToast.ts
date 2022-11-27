import { useEffect, useState } from 'react';
import type { Id, TypeOptions } from 'react-toastify';
import { toast } from 'react-toastify';
import { ToastProps } from 'react-toastify/dist/types';

type HookType = {
  Result: any;
  SuccessType?: TypeOptions;
  loadingMessage?: string;
  successMessage?: string;
  ErrorMessage?: string;
  toastProps?: Partial<ToastProps>;
};

export const useApiToast = ({
  Result,
  SuccessType = 'success',
  loadingMessage = 'Loading',
  successMessage = 'Successfully',
  ErrorMessage = 'Error has Occur',
  toastProps,
}: HookType) => {
  const [ToastId, setToastId] = useState<Id | null>(null);
  useEffect(() => {
    if (Result.isLoading) {
      const toastId = toast.loading(loadingMessage, toastProps);
      setToastId(toastId);
    }
    if (Result.isSuccess && ToastId) {
      toast.update(ToastId, {
        render: successMessage,
        type: SuccessType,
        autoClose: 3000,
        isLoading: false,
      });
    }
    if (Result.isError && ToastId) {
      toast.update(ToastId, {
        render: ErrorMessage,
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      });
    }
    return () => {
      if (ToastId) {
        toast.dismiss(ToastId);
        setToastId(null);
      }
    };
  }, [Result]);
  return { ToastId };
};
