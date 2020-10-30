import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header/index";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import PlaceOrder from "./pages/PlaceOrder";
import OrderList from "./pages/OrdersList";
import ProductList from "./pages/ProductList";
import UserList from "./pages/UserList";
import EditUser from "./pages/EditUser";
import EditProduct from "./pages/EditProduct";
import Order from "./pages/Order";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";

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
            <Route
              exact={true}
              path="/forgotPasssword"
              component={ForgotPassword}
            />
            <Route
              exact={true}
              path="/resetPassword"
              component={ResetPassword}
            />
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
            <AdminRoute
              exact={true}
              path="/admin/user/:userId/edit"
              component={EditUser}
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
