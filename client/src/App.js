import React, { useEffect } from 'react';
import AppNavBar from './components/AppNavBar';
import ShopingList from './components/ShopingList';
import ItemModal from './components/ItemModal';

import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { connect } from 'react-redux';

const App = props => {
  const { loadUser } = props;

  useEffect(loadUser, []);

  return (
    <div className="App">
      <AppNavBar />
      <Container className="btn-container">
        <ItemModal />
        <ShopingList />
      </Container>
    </div>
  );
};

App.propTypes = {
  loadUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { loadUser }
)(App);
