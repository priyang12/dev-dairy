/* eslint-disable */
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import type { AlertState, AuthState } from '../actions/interfaces';
import Spinner from './spinner';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentProps<typeof Route>['component'];
}

function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, ...rest } = props;

  const { isAuth }: AuthState = useSelector((state: any) => state.auth);
  const { loading }: AlertState = useSelector((state: any) => state.alert);
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        loading ? (
          <Spinner />
        ) : isAuth ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/Auth',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
