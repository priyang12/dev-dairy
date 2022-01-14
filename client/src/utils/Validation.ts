export const ValidateName = (name: string) => {
  if (name.length < 4 || name.length > 10)
    return "Name must be between 4 and 10 characters";
  return "";
};

export const ValidateEmail = (email: string) => {
  // eslint-disable-next-line

  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
  if (!re.test(String(email).toLowerCase()) || email === "")
    return "Please enter a valid email";
  return "";
};

export const ValidatePassword = (password: string) => {
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

export const ConfirmPassword = (password: string, password2: String) => {
  if (password !== password2) return "Passwords do not match";
  return "";
};
