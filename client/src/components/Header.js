import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const userAuthorization = context.authenticatedUser;

  return (
    <div className="header">
      <div className="bounds">
        <NavLink to='/'><h1 className="header--logo">Courses</h1></NavLink>
        <nav>
          {userAuthorization ? (
            <React.Fragment>
              <span>Welcome, {userAuthorization.firstName} {userAuthorization.lastName}!</span>
              <Link className="signout" to="/signout">Sign Out</Link>
            </React.Fragment>
          ) : (   
            <React.Fragment>
              <NavLink className="signup" to="/signup">Sign Up</NavLink>
              <NavLink className="signin" to="/signin">Sign In</NavLink>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  )
}
};