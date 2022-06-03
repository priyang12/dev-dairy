import {
  ValidateName,
  ValidateEmail,
  ValidatePassword,
  ConfirmPasswordCheck,
  CheckURL,
} from '../Validation';

describe('Validation Utils', () => {
  it('Validate Name should return an error if the name is not alphanumeric', () => {
    const result = ValidateName('', 'Name');
    expect(result).toBe('Name must be between 4 and 10 characters');
  });
  it('Validate Name should return an empty string if the name is between 4 and 10 characters', () => {
    const result = ValidateName('Priyang');
    expect(result).toBe('');
  });
  //   Email Validation
  it('Validate Email should return an error if the email is not valid', () => {
    let result = ValidateEmail('a');
    expect(result).toBe('Please enter a valid email');
    result = ValidateEmail('a@basdasd');
    expect(result).toBe('Please enter a valid email');
    result = ValidateEmail('asdasd.com');
    expect(result).toBe('Please enter a valid email');
  });
  it('Validate Email should return an empty string if the email is valid', () => {
    const result = ValidateEmail('patel@gmail.com');
    expect(result).toBe('');
  });
  //   Password Validation
  it('Validate Password should return an error if the password is not at least 6 characters', () => {
    const result = ValidatePassword('a');
    expect(result).toBe('Password must be at least 6 characters');
  });
  it('Validate Password should return an empty string if the password is at least 6 characters', () => {
    const result = ValidatePassword('asdasd');
    expect(result).toBe('');
  });
  it('Confirm Password Check should return an error if the password and confirm password do not match', () => {
    let result = ConfirmPasswordCheck('asdasd', '123123');
    expect(result).toBe('Passwords do not match');
    result = ConfirmPasswordCheck('asdasd', 'AsdasD');
    expect(result).toBe('Passwords do not match');
  });
  it('Confirm Password Check should return an empty string if the password and confirm password match', () => {
    const result = ConfirmPasswordCheck('asdasd', 'asdasd');
    expect(result).toBe('');
  });
  it('CheckURL should return false if the url is not valid', () => {
    let result = CheckURL('a');
    expect(result).toBe(false);
    result = CheckURL('a@basdasd');
    expect(result).toBe(false);
    result = CheckURL('asdasd.com');
    expect(result).toBe(false);
  });
  it('CheckURL should return true if the url is valid', () => {
    const result = CheckURL('https://google.com');
    expect(result).toBe(true);
  });
});
