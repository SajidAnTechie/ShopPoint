import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import SearchBox from '../SearchBox/SearchBox';
import * as routes from '../../constants/routes';
import '../style.css';

const Header = () => {
  const userAuthData = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const { userInfo } = userAuthData;

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={routes.HOME}>
            <Navbar.Brand>ShopPoint</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ml-auto">
              <LinkContainer to={routes.CART}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>{' '}
                  {cartItems.length > 0 && (
                    <span className="cart">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={routes.PROFILE}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.LOGOUT}>
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to={routes.LOGIN}>
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown title="Admin" id="adminMenu">
                  <LinkContainer to={routes.USERS}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.PRODUCTS}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={routes.ORDERS}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
