import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const CheckError = (
  error: any,
  ErrorMessage: string = 'Something went wrong',
) => {
  let errorMessage = ErrorMessage;
  if ('error' in error) {
    const errMsg =
      'status' in error.error
        ? error.error.data.message
        : JSON.stringify(error.data);

    console.log(errMsg);

    errorMessage = errMsg;
  }
  return errorMessage;
};

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(
  error: unknown,
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}
