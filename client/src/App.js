import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import Shipping from "./Pages/Shipping";
import Payment from "./Pages/Payment";
import Profile from "./Pages/Profile";
import PlaceOrder from "./Pages/PlaceOrder";
import OrderList from "./Pages/OrdersList";
import ProductList from "./Pages/ProductList";
import UserList from "./Pages/UserList";
import EditProduct from "./Pages/EditProduct";
import Order from "./Pages/Order";
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
            <PrivateRoute exact={true} path="/shipping" component={Shipping} />
            <PrivateRoute exact={true} path="/payment" component={Payment} />
            <PrivateRoute
              exact={true}
              path="/placeOrder"
              component={PlaceOrder}
            />
            <PrivateRoute
              exact={true}
              path="/order/:orderId"
              component={Order}
            />
            <PrivateRoute exact={true} path="/profile" component={Profile} />
            <AdminRoute
              exact={true}
              path="/admin/orderList"
              component={OrderList}
            />
            <AdminRoute
              exact={true}
              path="/admin/productList"
              component={ProductList}
            />
            <AdminRoute
              exact={true}
              path="/admin/product/:productId/edit"
              component={EditProduct}
            />
            <AdminRoute
              exact={true}
              path="/admin/userList"
              component={UserList}
            />
            <Route exact={true} path="/register" component={Register} />
            <Route
              exact={true}
              path="/EmailVerification"
              component={EmailVerification}
            />
            <Route exact={true} path="/logout" component={Logout} />
          </Switch>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
