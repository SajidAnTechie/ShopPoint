import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../components/Message/errorMessage';
import { listOrders } from '../actions/orderAction';
import TableLoader from '../components/Loader/TableLoader';
import Print from '../components/Print/Print';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as routes from '../constants/routes';
import { createPdfData } from '../services/order';
import { interpolate } from '../utils/string';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const OrderList = () => {
  const orderList = useSelector((state) => state.orderList);
  const userLogin = useSelector((state) => state.userLogin);
  const [initialLoading, setInitialLoading] = useState(true);

  const { orders, loading, error, count, success } = orderList;
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());

    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  const printAs = (value) => {
    const downloadAs = value;

    switch (downloadAs) {
      case 'pdf':
        var docDefinition = createPdfData(userInfo, orders);

        pdfMake.createPdf(docDefinition).download('orders-list.pdf');

        break;
      case 'excel':
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
          {' '}
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
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer
                    to={interpolate(routes.ORDER, {
                      orderId: order._id,
                    })}
                  >
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
