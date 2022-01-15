import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import CustomForm, { FormField } from "../components/CustomForm";
import Spinner from "../components/spinner";

import { AlertState, AuthState } from "../actions/interfaces";

import { ValidateEmail, ValidatePassword } from "../utils/Validation";
import { LoginAction } from "../actions/AuthAction";

const Login = () => {
  const AuthState: AuthState = useSelector((state: any) => state.Auth);
  const AlertState: AlertState = useSelector((state: any) => state.Alert);

  const { isAuth } = AuthState;
  const { loading } = AlertState;

  const dispatch = useDispatch();
  const LoginFields: FormField[] = [
    {
      fieldType: "text",
      fieldName: "email",
      placeholder: "Email",
    },
    {
      fieldType: "password",
      fieldName: "password",
    },
  ];

  const LoginUser = (FormValues: any, setErrors: any) => {
    const EmailError = ValidateEmail(FormValues.email);
    const PasswordError = ValidatePassword(FormValues.password);
    setErrors({
      email: EmailError,
      password: PasswordError,
    });
    console.log(EmailError, PasswordError);
    if (!EmailError || !PasswordError) {
      dispatch(LoginAction(FormValues));
    }
  };
  if (isAuth) {
    return <Redirect to='/feeds' />;
  }
  if (loading) return <Spinner />;
  return (
    <Fragment>
      <div className='row'>
        <div className='col-sm-4 m-auto '>
          <h1 className='display-4 text-center'>Log in</h1>
          <CustomForm
            SubmitForm={LoginUser}
            FormFields={LoginFields}
            FormSubmitValue='Log In'
          />
          <span className='my-1 '>
            <Link to='ResetPassword' className='black-text'>
              / Forgot Password ?
            </Link>
          </span>
          <p className='text-center lead'>
            Login in to your DevConnector account
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
