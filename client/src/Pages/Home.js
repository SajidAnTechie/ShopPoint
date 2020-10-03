import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import * as productAction from "../Actions/productAction";
import Product from "../Components/Product/Product";

const Home = () => {
  const [sort, setSort] = useState([]);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  const productData = useSelector((state) => state.productList);

  const { loading, products, count, error, success } = productData;

  const queryParams = new URLSearchParams(window.location.search);
  const searchProductKey = queryParams.get("search")
    ? queryParams.get("search").trim()
    : "";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      productAction.listProducts(
        searchProductKey,
        sort,
        category,
        priceRange,
        initialLoading
      )
    );
  }, [dispatch, searchProductKey, sort, category, priceRange]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
  }, [dispatch, success]);

  return (
    <>
      {searchProductKey ? (
        <>
          <Link to="/" className="btn btn-light">
            Go Back
          </Link>
          <h1>
            Search Products for {searchProductKey}({count})
          </h1>
        </>
      ) : (
        <h1>Latest Products({count})</h1>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : // <Loader />
      error ? (
        <p>{error}</p>
      ) : (
        // <Message variant='danger'>{error}</Message>
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
export default Home;
