import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const CheckError = (
  error: any,
  ErrorMessage: string = 'Something went wrong',
) => {
  let errorMessage = ErrorMessage;
  if (typeof error === 'object' && 'error' in error) {
    const errMsg =
      'status' in error.error
        ? error.error.data.message
        : JSON.stringify(error.data);

    errorMessage = errMsg;
  }
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  return errorMessage;
};

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}
