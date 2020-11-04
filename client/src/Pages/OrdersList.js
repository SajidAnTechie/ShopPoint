import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/Message/errorMessage";
import { listOrders } from "../actions/orderAction";
import TableLoader from "../components/Loader/TableLoader";
import Print from "../components/Print/Print";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const OrderList = () => {
  const orderList = useSelector((state) => state.orderList);
  const userLogin = useSelector((state) => state.userLogin);

  const { orders, loading, error, count } = orderList;
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    // eslint-disable-next-line
  }, [dispatch]);

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
                      text: "Orders List",
                    },
                  ],
                ],
              },
            },

            orders.length > 0
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
                          text: "USER",
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
                        {
                          text: "TOTAL PRICE",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "PAID",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                        {
                          text: "DELIVERED",
                          bold: true,
                          fillColor: "#2B2B52",
                          color: "white",
                        },
                      ],

                      ...orders.map((o, i) => [
                        i + 1,
                        o._id,
                        o.userId && o.userId.name,
                        o.createdAt.substring(0, 10),
                        o.totalPrice,
                        o.isPaid ? o.paidAt.substring(0, 10) : "Not paid",
                        o.isDelivered
                          ? o.deliveredAt.substring(0, 10)
                          : "Not paid",
                      ]),
                    ],
                  },

                  fontSize: 9,
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
        pdfMake.createPdf(docDefinition).download("ordersList.pdf");

        break;
      case "excel":
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="clearfix">
        <span className="float-left">
          <h1>Orders ({count})</h1>
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
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId && order.userId.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderList;
