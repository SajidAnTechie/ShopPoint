import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import * as productAction from "../actions/productAction";
import Product from "../components/Product/Product";
import Filter from "../components/Filter/Filter";
import ErrorMessage from "../components/Message/errorMessage";
import HomeLoader from "../components/Loader/HomeLoader";
import Meta from "../components/Meta/Meta";

const Home = () => {
  const [sort, setSort] = useState([]);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [ltORgt, setLtORgt] = useState("");

  const [initialLoading, setInitialLoading] = useState(true);

  const productList = useSelector((state) => state.productList);

  const { loading, products, count, error, success } = productList;

  const queryParams = new URLSearchParams(window.location.search);
  const searchProductKey = queryParams.get("search")
    ? queryParams.get("search").trim()
    : "";

  const dispatch = useDispatch();

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    } else {
      fetchProductList();
    }
    // eslint-disable-next-line
  }, [dispatch, searchProductKey, success, sort, category]);

  const fetchProductList = () => {
    dispatch(
      productAction.listProducts({
        searchProductKey,
        sort,
        category,
        priceRange,
        initialLoading,
        ltORgt,
      })
    );
  };

  const handleSort = (value) => {
    sort.includes(value)
      ? setSort(sort.filter((s) => s !== value))
      : setSort((sort) => sort.concat(value));
  };

  const handlePriceRange = () => {
    if (priceRange === "" || ltORgt === "") {
      return;
    }
    fetchProductList();
  };
  return (
    <>
      <Meta />
      {loading ? (
        <HomeLoader />
      ) : error ? (
        <ErrorMessage header="Something went wrong" message={error} />
      ) : (
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
            <div className="clearfix">
              <span className="float-left">
                <h1>Latest Products ({count})</h1>
              </span>
              <span className="float-right">
                {" "}
                <Filter
                  setCategory={setCategory}
                  sort={sort}
                  handleSort={handleSort}
                  setPriceRange={setPriceRange}
                  setLtORgt={setLtORgt}
                  ltORgt={ltORgt}
                  handlePriceRange={handlePriceRange}
                />
              </span>
            </div>
          )}
          {products.length === 0 && <h4>No Products</h4>}
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
