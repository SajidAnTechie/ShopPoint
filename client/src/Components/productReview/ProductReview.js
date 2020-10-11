import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../../Actions/productAction";
import ErrorMessage from "../Message/errorMessage";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const ProductReview = ({ productId }) => {
  const [initialLoading, setInitialLoading] = useState(true);

  const productReviewsData = useSelector((state) => state.productReview);

  const userAuthData = useSelector((state) => state.userLogin);

  const { userInfo } = userAuthData;

  const { loading, productReviews, count, error, success } = productReviewsData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.productReview(productId, initialLoading));
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  return loading ? (
    <p>Loding....</p>
  ) : error ? (
    <ErrorMessage header="Something went wrong" message={error} />
  ) : (
    <Row>
      <Col md={6}>
        <h2>Reviews({count})</h2>
        {productReviews.length === 0 && <h4>No Reviews</h4>}
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
            {/* {errorProductReview && (
              <Message variant="danger">{errorProductReview}</Message>
            )} */}
            {userInfo ? (
              <Form>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    //value={rating}
                    //onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    row="3"
                    //value={comment}
                    //onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            ) : (
              <>
                Please <Link to="/login">sign in</Link> to write a review{" "}
              </>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default ProductReview;
