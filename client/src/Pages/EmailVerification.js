import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../Components/Message/errorMessage";
import FormContainer from "../Components/FormContainer/FormContainer";
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core/";
import * as userAction from "../Actions/userAction";
import * as userConstants from "../Constants/userConstants";

const useStyles = makeStyles((theme) => ({
  prgressColor: {
    color: "#fff",
  },
}));

const EmailVerification = ({ location, history }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const classes = useStyles();

  const userAuthData = useSelector((state) => state.userLogin);

  const { userInfo, error, loading } = userAuthData;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch, userInfo, redirect, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userAction.emailVerification(verificationCode));
  };

  return (
    <>
      {error && (
        <ErrorMessage
          header="Auth Error"
          message={error}
          reset={userConstants.RESET}
        />
      )}
      <FormContainer>
        <h1>Email Verification</h1>
        <Form>
          <TextField
            variant="outlined"
            type="text"
            margin="normal"
            required
            fullWidth
            id="code"
            label="Verification Code"
            name="code"
            autoComplete="code"
            autoFocus
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                color="inherit"
                className={classes.prgressColor}
              />
            ) : (
              <>Verify</>
            )}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EmailVerification;
