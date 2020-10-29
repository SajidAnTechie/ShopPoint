import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../Components/Message/errorMessage";
import SuccessMessage from "../Components/Message/successMessage";
import TableLoader from "../Components/Loader/TableLoader";
import {
  Button as MaterialButton,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core/";
import {
  listProductsForAdmin,
  deleteProduct,
  createProduct,
} from "../Actions/productAction";
import * as productConstants from "../Constants/productConstants";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 330,
    top: 6,
    left: -4,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: "#fff",
  },
}));

const ProductList = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products, count, error, success } = productList;

  const deleteProductData = useSelector((state) => state.deleteProduct);
  const { success: deleteSuccess, error: deleteFail } = deleteProductData;

  const createProductDetails = useSelector(
    (state) => state.createProductDetails
  );
  const {
    success: createSuccess,
    error: createFail,
    loading: createLoading,
  } = createProductDetails;

  const classes = useStyles();

  const [name, setName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (createSuccess) {
      setOpenForm(false);
      setName("");
      setProductImage("");
      setBrand("");
      setPrice("");
      setCategory("");
      setCountInStock("");
      setDescription("");

      dispatch({ type: productConstants.CREATE_PRODUCT_RESET });
    }
    dispatch(listProductsForAdmin(initialLoading));
    // eslint-disable-next-line
  }, [dispatch, deleteSuccess, createSuccess]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  const cancelCreateProduct = () => {
    setOpenForm(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      category === "" ||
      productImage === "" ||
      description === "" ||
      brand === "" ||
      price === "" ||
      countInStock === ""
    ) {
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("productImage", productImage);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    dispatch(createProduct(formData));
  };

  const openNewProductForm = () => {
    if (openForm) {
      return (
        <>
          <Modal
            show={openForm}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Product
              </Modal.Title>
            </Modal.Header>
            {createFail && (
              <ErrorMessage
                header="Something went wrong"
                message={createFail}
                reset={productConstants.CREATE_PRODUCT_RESET}
              />
            )}
            <Form onSubmit={submitHandler}>
              <Modal.Body className="show-grid">
                <Container>
                  <Row>
                    <Col xs={12} md={6}>
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
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="brand"
                        label="Brand"
                        name="brand"
                        autoComplete="brand"
                        autoFocus
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        type="number"
                        margin="normal"
                        required
                        fullWidth
                        id="price"
                        label="Price"
                        name="price"
                        autoComplete="price"
                        autoFocus
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        type="number"
                        margin="normal"
                        required
                        fullWidth
                        id="countInStock"
                        label="CountInStock"
                        name="countInStock"
                        autoComplete="countInStock"
                        autoFocus
                        value={countInStock}
                        onChange={(e) =>
                          setCountInStock(Number(e.target.value))
                        }
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={6}>
                      <TextField
                        variant="outlined"
                        type="file"
                        margin="normal"
                        required
                        fullWidth
                        id="file"
                        name="file"
                        autoComplete="file"
                        autoFocus
                        onChange={(e) => setProductImage(e.target.files[0])}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          onChange={(e) => setCategory(e.target.value)}
                          label="Category"
                          value={category}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Shirt">T-shirt</MenuItem>
                          <MenuItem value="Pants">Pant</MenuItem>
                          <MenuItem value="Vest">Vest</MenuItem>
                        </Select>
                      </FormControl>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12}>
                      <TextField
                        variant="outlined"
                        type="text"
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        autoFocus
                        value={description}
                        multiline
                        rows={5}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <MaterialButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="mr-2"
                  disabled={createLoading}
                >
                  {createLoading ? (
                    <CircularProgress
                      color="inherit"
                      className={classes.prgressColor}
                    />
                  ) : (
                    <>Submit</>
                  )}
                </MaterialButton>{" "}
                <MaterialButton
                  variant="contained"
                  color="primary"
                  onClick={cancelCreateProduct}
                >
                  Close
                </MaterialButton>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      );
    }
  };

  const deleteHandler = (id, e) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className="font-weight-bold text-white">Are you sure?</h1>
            <p>You want to delete this product?</p>
            <MaterialButton
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(deleteProduct(id));
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
          message="Product Deleted Successfully"
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
          <MaterialButton
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
          >
            <i className="fas fa-plus"></i> Create Product
          </MaterialButton>
        </Col>
      </Row>
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
                      onClick={(e) => deleteHandler(product._id, e)}
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
      {openNewProductForm()}
    </>
  );
};

export default ProductList;
