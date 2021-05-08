import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../../actions/productAction";
import ErrorMessage from "../Message/errorMessage";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import {
  Select,
  Button,
  FormControl,
  makeStyles,
  MenuItem,
  InputLabel,
  TextField,
  CircularProgress,
} from "@material-ui/core/";

import * as productConstants from "../../constants/productConstants";
import * as routes from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  prgressColor: {
    color: "#fff",
  },
}));

const ProductReview = ({ productId }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");

  const classes = useStyles();

  const productReviewsData = useSelector((state) => state.productReview);
  const reviewResponses = useSelector((state) => state.createReview);

  const {
    success: createReviewSuccess,
    loading: createReviewLoading,
  } = reviewResponses;

  const userAuthData = useSelector((state) => state.userLogin);

  const { userInfo } = userAuthData;

  const { loading, productReviews, count, error, success } = productReviewsData;

  const dispatch = useDispatch();

  useEffect(() => {
    if (createReviewSuccess) {
      setTitle("");
      setText("");
      setRating("");
      dispatch({ type: productConstants.CREATE_REVIEW_RESET });
    }
    if (success && initialLoading) {
      setInitialLoading(false);
    } else {
      dispatch(productAction.productReview(productId, initialLoading));
    }
    // eslint-disable-next-line
  }, [dispatch, createReviewSuccess, success]);

  const handleCreateReview = (e) => {
    e.preventDefault();

    dispatch(productAction.createReview(productId, title, text, rating));
  };

  return loading ? (
    <p>Loding....</p>
  ) : error ? (
    <ErrorMessage header="Something went wrong" message={error} />
  ) : (
    <>
      <Row>
        <Col md={6}>
          <h2>Reviews({count})</h2>
          {!productReviews.length && <h4>No Reviews</h4>}
          <ListGroup variant="flush">
            {productReviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.userId.name}</strong>

                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.text}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>

              {userInfo ? (
                <Form onSubmit={handleCreateReview}>
                  <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    placeholder="Write a title"
                    required
                    fullWidth
                    id="title"
                    label="Write a title"
                    name="title"
                    autoComplete="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    type="text"
                    margin="normal"
                    placeholder="Write a comment"
                    required
                    fullWidth
                    id="comment"
                    label="Write a comment"
                    name="comment"
                    autoComplete="comment"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Rating
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(e) => setRating(Number(e.target.value))}
                      label="Rating"
                      autoWidth
                      value={rating}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="1">1 - Poor</MenuItem>
                      <MenuItem value="2">2 - Fair</MenuItem>
                      <MenuItem value="3">3 - Good</MenuItem>
                      <MenuItem value="4">4 - Very Good</MenuItem>
                      <MenuItem value="5">5 - Excellent</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="my-3">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={createReviewLoading}
                    >
                      {createReviewLoading ? (
                        <CircularProgress
                          color="inherit"
                          className={classes.prgressColor}
                        />
                      ) : (
                        <>Submit</>
                      )}
                    </Button>
                  </div>
                </Form>
              ) : (
                <>
                  Please <Link to={routes.LOGIN}>sign in</Link> to write a
                  review{" "}
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductReview;
