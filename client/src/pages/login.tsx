import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import type { FormField } from '../components/CustomForm';
import CustomForm from '../components/CustomForm';
import Spinner from '../components/spinner';

import type { AlertState, AuthState } from '../actions/interfaces';

import { ValidateEmail, ValidatePassword } from '../utils/Validation';
import { LoginAction } from '../actions/AuthAction';

function Login() {
   const AuthState: AuthState = useSelector((state: any) => state.Auth);
   const AlertState: AlertState = useSelector((state: any) => state.Alert);

   const { isAuth } = AuthState;
   const { loading } = AlertState;

   const dispatch = useDispatch();
   const LoginFields: FormField[] = [
      {
         fieldType: 'text',
         fieldName: 'email',
         placeholder: 'Email'
      },
      {
         fieldType: 'password',
         fieldName: 'password'
      }
   ];

   const LoginUser = (FormValues: any, setErrors: any) => {
      const EmailError = ValidateEmail(FormValues.email);
      const PasswordError = ValidatePassword(FormValues.password);
      setErrors({
         email: EmailError,
         password: PasswordError
      });
      if (!EmailError || !PasswordError) {
         dispatch(LoginAction(FormValues));
      }
   };
   if (isAuth) {
      return <Navigate to="/feeds" />;
   }
   if (loading) return <Spinner />;
   return (
      <div className="row">
         <div className="col-sm-4 m-auto ">
            <h1 className="display-4 text-center">Log in</h1>
            <CustomForm
               SubmitForm={LoginUser}
               FormFields={LoginFields}
               FormSubmitValue="Log In"
            />
            <span className="my-1 ">
               <Link to="ResetPassword" className="black-text">
                  / Forgot Password ?
               </Link>
            </span>
            <p className="text-center lead">
               Login in to your DevConnector account
            </p>
         </div>
      </div>
   );
}

export default Login;
