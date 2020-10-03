import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

//This component will allow users to access private routes if they are authenticated, if not, it will redirect them to the sign in page.
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};