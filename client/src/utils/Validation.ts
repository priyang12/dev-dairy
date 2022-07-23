export const ValidateTitle = (name: string, FieldName?: string) => {
  let error = '';
  if (name.length < 4 || name.length > 30) {
    error = `${FieldName ?? 'Name'} must be between 4 and 30 characters`;
  }

  return error;
};

export const ValidateDescription = (
  description: string,
  FieldName?: string,
) => {
  let error = '';

  if (description.length < 10 || description.length > 400) {
    error = `${
      FieldName ?? 'Description'
    } must be between 10 and 400 characters`;
  }
  return error;
};

export const ValidateEmail = (email: string) => {
  // eslint-disable-next-line

  const re =    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
  if (!re.test(String(email).toLowerCase()) || email === '') return 'Please enter a valid email';
  return '';
};

export const ValidatePassword = (password: string) => {
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

export const ConfirmPasswordCheck = (password: string, password2: string) => {
  if (password !== password2) return 'Passwords do not match';
  return '';
};

export const CheckURL = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};
