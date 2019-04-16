import React from 'react';
import { connect } from 'react-redux';
import { logout } from "../../actions/authActions";
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

const Logout = props => {
  const { logout } = props;

  return (
    <>
      <NavLink onClick={logout} href='#'>Logout</NavLink>
    </>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout);