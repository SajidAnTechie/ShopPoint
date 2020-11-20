import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/Message/errorMessage";
import SuccessMessage from "../components/Message/successMessage";
import { userList, userDelete } from "../actions/userAction";
import * as userConstants from "../constants/userConstants";
import { Button as MaterialButton } from "@material-ui/core/";
import TableLoader from "../components/Loader/TableLoader";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import Print from "../components/Print/Print";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const UserList = () => {
  const dispatch = useDispatch();

  const [initialLoading, setInitialLoading] = useState(true);
  const userListDetails = useSelector((state) => state.userList);
  const { loading, users, count, error, success } = userListDetails;

  const userDeleteDetails = useSelector((state) => state.userDeleteDetails);
  const { success: deleteSuccess, error: deleteFail } = userDeleteDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    } else {
      dispatch(userList(initialLoading));
    }
    // eslint-disable-next-line
  }, [dispatch, success, deleteSuccess]);

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

  const printAs = (e) => {
    const downloadAs = e.target.value;

    switch (downloadAs) {
      case "pdf":
        var docDefinition = {
          content: [
            //Header
            {
              table: {
                widths: ["auto", "*"],

                body: [
                  [
                    {
                      text: "SHOPPOINT",
                      style: "mainheader",
                      bold: true,
                      marginTop: 10,
                    },

                    {
                      width: "*",
                      style: "usersOrders",
                      marginBottom: 30,
                      stack: [
                        {
                          style: "h2",
                          text: `Name: ${userInfo.name}`,
                        },
                        {
                          style: "h2",
                          text: `Email: ${userInfo.email}`,
                        },
                      ],
                    },
                  ],
                ],
              },
              layout: {
                hLineWidth: function (line) {
                  return line === 1;
                },
                vLineWidth: function () {
                  return 0;
                },
                paddingBottom: function () {
                  return 5;
                },
              },
            },

            //Vitals Details
            {
              style: "header",
              table: {
                widths: "*",
                body: [
                  [
                    {
                      border: ["#5bc0de", false, false, false],
                      text: "Users List",
                    },
                  ],
                ],
              },
            },

            users.length > 0
              ? {
                  layout: {
                    hLineWidth: function () {
                      return 0;
                    },
                    vLineWidth: function () {
                      return 0;
                    },
                    paddingBottom: function () {
                      return 5;
                    },
                  },
                  table: {
                    headerRows: 1,
                    body: [
                      [
                        {
                          text: "S.No",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "ID",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "NAME",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "EMAIL",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "VERIFIED",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "ROLE",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "DATE",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                      ],

                      ...users.map((u, i) => [
                        i + 1,
                        u._id,
                        u.name,
                        u.email,
                        u.verify ? "Verified" : "Not paid",
                        u.role,
                        u.createdAt.substring(0, 10),
                      ]),
                    ],
                  },

                  fontSize: 8,
                  alignment: "center",
                }
              : null,
          ],
          styles: {
            header: {
              fontSize: 12,
              marginBottom: 20,
              marginTop: 20,
              bold: true,
            },
            mainheader: {
              fontSize: 15,
            },

            usersOrders: {
              marginLeft: 315,
            },

            h2: {
              marginTop: 5,
              fontSize: 7,
            },
          },
        };
        pdfMake.createPdf(docDefinition).download("usersList.pdf");

        break;
      case "excel":
        break;

      default:
        break;
    }
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
      <div className="clearfix">
        <span className="float-left">
          <h1>Users ({count})</h1>
        </span>

        <span className="float-right">
          {" "}
          <Print printAs={printAs} />
        </span>
      </div>

      {loading ? (
        <TableLoader />
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
                <th>VERIFIED</th>
                <th>ROLE</th>
                <th>DATE</th>
                <th>ACTION</th>
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
                  <td>
                    {user.verify ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "#43BE31" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>{user.role}</td>
                  <td>{user.createdAt.substring(0, 10)}</td>

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
