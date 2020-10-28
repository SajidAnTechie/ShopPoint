import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../Components/Message/errorMessage";
import SuccessMessage from "../Components/Message/successMessage";
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

const ForgotPassword = ({ history }) => {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const classes = useStyles();

  const resetPasswordDetails = useSelector(
    (state) => state.resetPasswordDetails
  );

  const { loading, error, message, success } = resetPasswordDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    const token = queryParams.get("token")
      ? queryParams.get("token").trim()
      : null;

    if (token) {
      setToken(token);
    } else {
      history.push("/login");
    }
  }, [dispatch, token, history]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    }
  }, [dispatch, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const resetPassworData = {
      newPassword,
      token,
    };
    dispatch(userAction.resetPassword(resetPassworData));
  };

  return (
    <>
      {error && (
        <ErrorMessage
          header="Auth Error"
          message={error}
          reset={userConstants.FORGOT_PASSWORD_SEND_RSET}
        />
      )}
      {success && (
        <SuccessMessage
          header="Done"
          message={message}
          reset={userConstants.FORGOT_PASSWORD_SEND_RSET}
        />
      )}
      <FormContainer>
        <h1>Reset Password</h1>
        <Form>
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            name="password"
            autoComplete="password"
            autoFocus
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
              <>Reset</>
            )}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ForgotPassword;
