import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../Components/Message/errorMessage";
import SuccessMessage from "../Components/Message/successMessage";
import { Button as MaterialButton } from "@material-ui/core/";
import { listProductsForAdmin, deleteProduct } from "../Actions/productAction";
import * as productConstants from "../Constants/productConstants";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const ProductList = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, count, error } = productList;

  const deleteProductData = useSelector((state) => state.deleteProduct);
  const {
    success: deleteSuccess,
    error: deleteFail,
    message,
  } = deleteProductData;

  useEffect(() => {
    dispatch(listProductsForAdmin());
    // eslint-disable-next-line
  }, [dispatch, deleteSuccess]);

  const deleteHandler = (id, e) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete this product?</p>
            <button
              onClick={() => {
                dispatch(deleteProduct(id));
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
            <button onClick={onClose}>No</button>
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
          message={message}
          reset={productConstants.DELETE_PRODUCT_RESET}
        />
      )}
      {deleteFail && (
        <ErrorMessage
          header="Something went wrong"
          message={deleteFail}
          reset={productConstants.DELETE_PRODUCT_RESET}
        />
      )}
      <Row>
        <Col>
          <h1>Products({count})</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to="/createProduct">
            <MaterialButton variant="contained" color="primary">
              <i className="fas fa-plus"></i> Create Product
            </MaterialButton>
          </LinkContainer>
        </Col>
      </Row>
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
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id, e)}
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

export default ProductList;
