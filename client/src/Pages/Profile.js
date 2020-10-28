import React, { useEffect } from "react";
import { Table, Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../Components/Message/errorMessage";
import { Button as MeterialButton } from "@material-ui/core/";
import { authOrder } from "../Actions/orderAction";
import TableLoader from "../Components/Loader/TableLoader";

const Profile = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const authOrders = useSelector((state) => state.authOrders);
  const { orders, loading, error } = authOrders;

  useEffect(() => {
    dispatch(authOrder());
    // eslint-disable-next-line
  }, [dispatch, userInfo]);

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
          </ListGroup>
        </Card>

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
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
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
                    <LinkContainer to={`/order/${order._id}`}>
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
