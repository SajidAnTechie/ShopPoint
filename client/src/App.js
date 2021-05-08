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
import * as routes from "./constants/routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact={true} path={routes.HOME} component={Home} />
            <Route exact={true} path={routes.PRODUCT} component={Product} />
            <Route exact={true} path={routes.LOGIN} component={Login} />
            <Route exact={true} path={routes.CART} component={Cart} />
            <Route
              exact={true}
              path={routes.FORGOT_PASSWORD}
              component={ForgotPassword}
            />
            <Route
              exact={true}
              path={routes.RESET_PASSWORD}
              component={ResetPassword}
            />
            <PrivateRoute
              exact={true}
              path={routes.SHIPPING}
              component={Shipping}
            />
            <PrivateRoute
              exact={true}
              path={routes.PAYMENT}
              component={Payment}
            />
            <PrivateRoute
              exact={true}
              path={routes.PLACE_ORDER}
              component={PlaceOrder}
            />
            <PrivateRoute exact={true} path={routes.ORDER} component={Order} />
            <PrivateRoute
              exact={true}
              path={routes.PROFILE}
              component={Profile}
            />
            <AdminRoute
              exact={true}
              path={routes.ORDERS}
              component={OrderList}
            />
            <AdminRoute
              exact={true}
              path={routes.PRODUCTS}
              component={ProductList}
            />
            <AdminRoute
              exact={true}
              path={routes.PRODUCT_EDIT}
              component={EditProduct}
            />
            <AdminRoute exact={true} path={routes.USERS} component={UserList} />
            <AdminRoute
              exact={true}
              path={routes.USER_EDIT}
              component={EditUser}
            />
            <Route exact={true} path={routes.REGISTER} component={Register} />
            <Route
              exact={true}
              path={routes.EMAIL_VERIFICATION}
              component={EmailVerification}
            />
            <Route exact={true} path={routes.LOGOUT} component={Logout} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
