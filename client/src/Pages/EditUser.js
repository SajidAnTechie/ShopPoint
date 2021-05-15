import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer/FormContainer';
import * as userAction from '../actions/userAction';
import * as userConstants from '../constants/userConstants';
import ErrorMessage from '../components/Message/errorMessage';
import {
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from '@material-ui/core/';
import { Link, Redirect } from 'react-router-dom';
import confirmationImg from '../assests/confirmation.png';
import { confirmAlert } from 'react-confirm-alert';
import * as routes from '../constants/routes';
import 'react-confirm-alert/src/react-confirm-alert.css';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: '#fff',
  },
}));

const UpdateUser = ({ match }) => {
  const userId = match.params.userId;
  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const { loading: updateLoading, error: updateError, success: updateSuccess } = userUpdateDetails;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error, success } = userDetails;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [Success, setSuccess] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.getUser(userId));

    // eslint-disable-next-line
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    // eslint-disable-next-line
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const UpdateData = {
      name,
      email,
      role,
    };
    dispatch(userAction.updateUser(userId, UpdateData));
  };

  const ConfirmedAlert = () => {
    if (updateSuccess) {
      return confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-ui-alert">
              <div className="success-img">
                <img src={confirmationImg} alt="confirmationImg" />
              </div>
              <h3 className="font-weight-bold text">User updated successfully</h3>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  onClose();
                  dispatch({ type: userConstants.USER_EDIT_RESET });
                  setSuccess(true);
                }}
              >
                OK
              </Button>
            </div>
          );
        },
      });
    }
  };

  return (
    <>
      {Success && <Redirect to={routes.USERS} />}
      {updateError && (
        <ErrorMessage header="Something went wrong" message={updateError} reset={userConstants.USER_EDIT_RESET} />
      )}
      <Link to={routes.USERS} className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <FormContainer>
            <h1>Edit User</h1>
            <Form onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                type="text"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                variant="outlined"
                type="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="brand"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={(e) => setRole(e.target.value)}
                  label="Role"
                  value={role}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateLoading}
                className={classes.prgressColor}
              >
                {updateLoading ? <CircularProgress color="inherit" /> : <>Update</>}
              </Button>
            </Form>
          </FormContainer>
          {ConfirmedAlert()}
        </>
      )}
    </>
  );
};

export default UpdateUser;
