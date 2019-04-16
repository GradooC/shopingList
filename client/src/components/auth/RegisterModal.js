import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
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

const RegisterModal = props => {
  const { isAuthenticated, error, register, clearErrors } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  const toggle = () => {
    //clear errorActions
    clearErrors();
    setModalIsOpen(prevModal => !prevModal);
  };

  const onSubmit = e => {
    e.preventDefault();

    // Create user object
    const newUser = { name, email, password };
    console.log(newUser);
    // Attempt to register
    register(newUser);

    // If authenticated - close modal
    if (modalIsOpen && isAuthenticated) {
      toggle();
    }
  };

  return (
    <>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>
      <Modal isOpen={modalIsOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={e => setName(e.target.value)}
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={e => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
              <Button color="success" outline className="add-btn-modal" block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
