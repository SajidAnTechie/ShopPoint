import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../Components/Message/errorMessage";
import SuccessMessage from "../Components/Message/successMessage";
import { userList, userDelete } from "../Actions/userAction";
import * as userConstants from "../Constants/userConstants";
import { Button as MaterialButton } from "@material-ui/core/";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const UserList = () => {
  const dispatch = useDispatch();

  const [initialLoading, setInitialLoading] = useState(true);
  const userListDetails = useSelector((state) => state.userList);
  const { loading, users, count, error, success } = userListDetails;

  const userDeleteDetails = useSelector((state) => state.userDeleteDetails);
  const { success: deleteSuccess, error: deleteFail } = userDeleteDetails;

  useEffect(() => {
    dispatch(userList(initialLoading));
    // eslint-disable-next-line
  }, [dispatch, deleteSuccess]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  const deleteHandler = (id, e) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className="font-weight-bold text-white">Are you sure?</h1>
            <p>You want to delete this user?</p>
            <MaterialButton
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(userDelete(id));
                onClose();
              }}
            >
              Yes, Delete it !
            </MaterialButton>
            <MaterialButton
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              No
            </MaterialButton>
          </div>
        );
      },
    });
  };

  return (
    <>
      {deleteSuccess && (
        <SuccessMessage
          header="Done"
          message="User Deleted Successfully"
          reset={userConstants.USER_DELETE_RESET}
        />
      )}
      {deleteFail && (
        <ErrorMessage
          header="Something went wrong"
          message={deleteFail}
          reset={userConstants.USER_DELETE_RESET}
        />
      )}

      <h1>Users({count})</h1>

      {loading ? (
        <h4>Loading...</h4>
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.role}</td>

                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => deleteHandler(user._id, e)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default UserList;
