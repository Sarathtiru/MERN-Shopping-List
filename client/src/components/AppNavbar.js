import React, { useState, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

const AppNavbar = props => {
  const [isOpen, setIsOpen] = useState(false);

  AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { isAuthenticated, user } = props.auth;
  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <Navbar color="dark" dark expand="sm" className="mb-5">
      <Container>
        <NavbarBrand href="/">ShoppingList</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  null
)(AppNavbar);
