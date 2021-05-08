import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as routes from "../constants/routes";
import * as userAction from "../actions/userAction";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.Logout());
  }, [dispatch]);

  return <Redirect to={routes.HOME} />;
};

export default Logout;
