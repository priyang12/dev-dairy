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

export const CheckURL = (string: string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};
