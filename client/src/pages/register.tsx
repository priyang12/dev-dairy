import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { FormField } from "../components/CustomForm";
import { AuthState } from "../actions/interfaces";
import CustomForm from "../components/CustomForm";
import {
  ConfirmPassword,
  ValidateEmail,
  ValidateName,
  ValidatePassword,
} from "../utils/Validation";
import { RegisterUserAction } from "../actions/AuthAction";

const Register = () => {
  const Auth: AuthState = useSelector((state: any) => state.Auth);
  const { isAuth } = Auth;
  const dispatch = useDispatch();
  const RegisterFields: FormField[] = [
    {
      fieldType: "text",
      fieldName: "name",
      placeholder: "Pick a Cool Nickname",
    },
    {
      fieldType: "email",
      fieldName: "email",
      placeholder: "We never share your email",
    },
    {
      fieldType: "password",
      fieldName: "password",
      placeholder: "Enter a Strong Password with at least 6 characters",
    },
    {
      fieldType: "password",
      fieldName: "Confirm password",
      placeholder: "Confirm your Password",
    },
  ];
  const RegisterUser = (FormValues: any, setErrors: any) => {
    const UsernameError = ValidateName(FormValues.name);
    const EmailError = ValidateEmail(FormValues.email);
    const PasswordError = ValidatePassword(FormValues.password);
    const ConfirmError = ConfirmPassword(
      FormValues.password,
      FormValues.password
    );
    setErrors({
      name: UsernameError,
      email: EmailError,
      password: PasswordError,
      confirm: ConfirmError,
    });
    if (!UsernameError && !EmailError && !PasswordError && !ConfirmError) {
      console.log(FormValues);
      dispatch(RegisterUserAction(FormValues));
    } else {
      console.log(UsernameError, EmailError, PasswordError, ConfirmError);
    }
  };
  if (isAuth) {
    return <Redirect to='/createProfile' />;
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-5 m-auto'>
          <h1 className='display-4 text-center'>Register</h1>
          <p className='text-center lead'>
            Sign up for your DevConnector account
          </p>

          <CustomForm
            FormFields={RegisterFields}
            SubmitForm={RegisterUser}
            FormSubmitValue='Register'
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
