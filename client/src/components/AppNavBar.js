import React from 'react';
import { useState } from 'react';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';

const AppNavBar = props => {
  const { isAuthenticated, user } = props.auth;

  const authLinks = (
      <>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcom ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(prevIsOpen => !prevIsOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">ShopingList</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

AppNavBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppNavBar);
