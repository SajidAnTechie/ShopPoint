import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../style.css";
const SearchBox = () => {
  const [searchKey, setSearchKey] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchKey !== "") {
      history.push(`/?search=${searchKey}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormControl
        type="text"
        name="seacrh"
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder="Search product..."
        className="mr-sm-2"
      />
      <i className="fas fa-search"></i>
    </Form>
  );
};

export default SearchBox;
