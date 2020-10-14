import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Shipping from "./Pages/Shipping";
import Logout from "./Pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route
              exact={true}
              path="/product/:productId"
              component={Product}
            />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/cart" component={Cart} />
            <Route exact={true} path="/shipping" component={Shipping} />
            <Route exact={true} path="/logout" component={Logout} />
          </Switch>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
