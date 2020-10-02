import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../Actions/productAction";

const Home = ({ match }) => {
  const [sort, setSort] = useState([]);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  const productData = useSelector((state) => state.productList);

  const { loading, product, count, error, success } = productData;

  const keyWord = match.params.search;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      productAction.listProducts(
        keyWord,
        sort,
        category,
        priceRange,
        initialLoading
      )
    );
  }, [dispatch, keyWord, sort, category, priceRange]);

  useEffect(() => {
    if (success && initialLoading) {
      setInitialLoading(false);
    }
  }, [success]);

  return <h2>Home </h2>;
};
export default Home;
