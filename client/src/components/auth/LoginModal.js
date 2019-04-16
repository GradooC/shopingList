import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';

const LoginModal = props => {
  const { isAuthenticated, error, login, clearErrors } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    // Check for register error
    if (error) {
      if (error.id === 'LOGIN_FAIL') {
        setMsg(error.msg);
      } else {
        setMsg(null);
      }
    }

    // If authenticated - close modal
    if (modalIsOpen && isAuthenticated) {
      toggle();
    }
  });

  const toggle = () => {
    //clear errorActions
    clearErrors();
    setModalIsOpen(prevModal => !prevModal);
  };

  const onSubmit = e => {
    e.preventDefault();
    const user = { email, password };
    login(user);
  };

  return (
    <>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modalIsOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Email"
                className="mb-3"
                onChange={e => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
              <Button color="success" outline className="add-btn-modal" block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);
