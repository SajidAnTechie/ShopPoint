import React, { useEffect } from "react";
import { Table, Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/Message/errorMessage";
//import { Button as MeterialButton } from "@material-ui/core/";
import { authOrder } from "../actions/orderAction";
import { interpolate } from "../utils/string";
import { createPdfData } from "../services/order";
import * as routes from "../constants/routes";
import TableLoader from "../components/Loader/TableLoader";
import Print from "../components/Print/Print";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Profile = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const authOrders = useSelector((state) => state.authOrders);
  const { orders, loading, error, count } = authOrders;

  useEffect(() => {
    dispatch(authOrder());
    // eslint-disable-next-line
  }, [dispatch, userInfo]);

  const printAs = (value) => {
    const downloadAs = value;

    switch (downloadAs) {
      case "pdf":
        var docDefinition = createPdfData(userInfo, orders);

        pdfMake.createPdf(docDefinition).download("user-order.pdf");

        break;
      case "excel":
        break;

      default:
        break;
    }
  };

  console.log(orders);

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Name:</Col>
                <Col>
                  <strong>{userInfo.name}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Email:</Col>
                <Col>
                  <strong>{userInfo.email}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Account:</Col>
                <Col>
                  <strong>
                    {userInfo.verify ? "Verified" : "Not Verified"}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <LinkContainer to="/updateUserDetails">
                <MeterialButton
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={true}
                >
                  Update
                </MeterialButton>
              </LinkContainer>
            </ListGroup.Item> */}
          </ListGroup>
        </Card>
      </Col>
      <Col md={9}>
        <div className="clearfix">
          <span className="float-left">
            <h1>My Orders ({count})</h1>
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
                <th>DATE</th>
                <th>TOTAL PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
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
                    <LinkContainer
                      to={interpolate(routes.ORDER, {
                        orderId: order._id,
                      })}
                    >
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
