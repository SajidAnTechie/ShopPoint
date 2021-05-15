import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
  const userAuthData = useSelector((state) => state.userLogin);

  const { userInfo } = userAuthData;

  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? (
          <Redirect to="/login" />
        ) : userInfo.role !== 'admin' ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AdminRoute;
