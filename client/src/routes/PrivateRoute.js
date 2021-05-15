import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {
  const userAuthData = useSelector((state) => state.userLogin);

  const { userInfo } = userAuthData;

  return <Route {...rest} render={(props) => (!userInfo ? <Redirect to="/login" /> : <Component {...props} />)} />;
};

export default PrivateRoutes;
