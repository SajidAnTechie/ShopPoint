import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Login from "./Pages/Login";

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
          </Switch>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
