import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/Message/errorMessage";
import SuccessMessage from "../components/Message/successMessage";
import FormContainer from "../components/FormContainer/FormContainer";
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core/";
import * as routes from "../constants/routes";
import * as userAction from "../actions/userAction";
import * as userConstants from "../constants/userConstants";

const useStyles = makeStyles((theme) => ({
  progressColor: {
    color: "#fff",
  },
}));

const Register = ({ location, history }) => {
  const [name, setName] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const classes = useStyles();

  const userRegisterData = useSelector((state) => state.userRegister);

  const { error, loading, message, success } = userRegisterData;

  const dispatch = useDispatch();

  const redirect = location.search
    ? location.search.split("=")[1]
    : routes.HOME;

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push({
          pathname: routes.EMAIL_VERIFICATION,
          search: `?redirect=${redirect}`,
        });
      }, 5000);
    }
  }, [success, history, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setVerificationMessage("");
    if (password !== confirmPassword) {
      return setVerificationMessage("Passwords don't match");
    }
    dispatch(userAction.Register(name, email, password));
  };

  const redirectUserToLoginRoute = redirect
    ? routes.LOGIN + `?redirect=${redirect}`
    : routes.LOGIN;

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && (
        <ErrorMessage
          header="Auth Error"
          message={error}
          reset={userConstants.USER_REGISTER_RESET}
        />
      )}
      {verificationMessage !== "" && (
        <ErrorMessage header="Auth Error" message={verificationMessage} />
      )}
      {success && (
        <SuccessMessage
          header="Register SuccessFully"
          message={message}
          reset={userConstants.USER_REGISTER_RESET}
        />
      )}
      <Form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          required
          fullWidth
          id="name"
          label="User Name"
          name="name"
          autoComplete="email"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          variant="outlined"
          type="email"
          margin="normal"
          placeholder="ex:- JohnDoe@gmail.com"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          type="password"
          placeholder="***********"
          required
          fullWidth
          name="password"
          label="Password"
          id="password"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          type="password"
          placeholder="***********"
          required
          fullWidth
          name="password"
          label="Password"
          id="password"
          value={confirmPassword}
          autoComplete="current-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
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
              className={classes.progressColor}
            />
          ) : (
            <>Register</>
          )}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <Link to={redirectUserToLoginRoute}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
