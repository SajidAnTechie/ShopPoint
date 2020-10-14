import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import PrivateRoute from "./routes/PrivateRoute"
import Shipping from "./Pages/Shipping";
import Logout from "./Pages/Logout";
import Register from "./Pages/Register";
import EmailVerification from "./Pages/EmailVerification";

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
            <PrivateRoute exact={true} path="/shipping" component={Shipping}/>
            <Route exact={true} path="/register" component={Register} />
            <Route exact={true} path="/EmailVerification" component={EmailVerification} />
            <Route exact={true} path="/logout" component={Logout} />
          </Switch>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
