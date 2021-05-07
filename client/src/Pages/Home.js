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
  const [priceRange, setPriceRange] = useState("");
  const [ltORgt, setLtORgt] = useState("");
  const [filters, setFilters] = useState({});

  const [initialLoading, setInitialLoading] = useState(true);

  const productList = useSelector((state) => state.productList);

  const { loading, products, count, error, success } = productList;

  const queryParams = new URLSearchParams(window.location.search);
  const searchProductKey = queryParams.get("search")
    ? queryParams.get("search").trim()
    : "";

  const dispatch = useDispatch();

  const handleFilters = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    } else {
      fetchProductList();
    }
    // eslint-disable-next-line
  }, [dispatch, filters, success]);

  useEffect(() => {
    handleFilters("keyWord", searchProductKey);
    // eslint-disable-next-line
  }, [searchProductKey]);

  useEffect(() => {
    handleFilters("sort", sort.join(","));
    // eslint-disable-next-line
  }, [sort]);

  const fetchProductList = () => {
    dispatch(
      productAction.listProducts(
        {
          ...filters,
        },
        initialLoading
      )
    );
  };

  const handleSort = (value) => {
    sort.includes(value)
      ? setSort(sort.filter((s) => s !== value))
      : setSort((preState) => [...preState, value]);
  };

  const handlePriceRange = () => {
    if ([priceRange, ltORgt].includes("")) {
      return;
    }
    filterPrevPrice();
    handleFilters(`price[${ltORgt}]`, priceRange);
  };

  const filterPrevPrice = () => {
    const filterprice = Object.keys(filters).filter((price) =>
      ["price[lt]", "price[gte]"].includes(price)
    );
    filterprice.forEach((price) => {
      if (filters[price]) {
        delete filters[price];
      }
    });
  };

  const clearFilter = () => {
    setFilters({});
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
                  sort={sort}
                  handleSort={handleSort}
                  setPriceRange={setPriceRange}
                  setLtORgt={setLtORgt}
                  ltORgt={ltORgt}
                  handlePriceRange={handlePriceRange}
                  handleFilters={handleFilters}
                  filters={filters}
                  clearFilter={clearFilter}
                />
              </span>
            </div>
          )}
          {!products.length && <h4>No Products</h4>}
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
