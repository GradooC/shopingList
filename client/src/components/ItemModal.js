import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
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
  FormFeedback
} from 'reactstrap';

const ItemModal = props => {
  const { isAuthenticated, addItem, items } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [isTouched, setIsTouched] = useState(false);

  const toggle = () => {
    setModalIsOpen(prevModal => !prevModal);
    setValidationError(null);
    setIsTouched(false);
    setName('');
  };

  const onChange = e => {
    setName(e.target.value);
    setIsTouched(true);
    isItemValid(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    const newItem = { name };

    addItem(newItem);
    toggle();
    setName('');
  };

  const isItemValid = name => {
    const errors = [
      {
        rule: name.trim() === '',
        msg: "Item's name shouldn't be empty"
      },
      {
        rule: items.map(item => item.name).includes(name),
        msg: 'This item already exists'
      }
    ];

    const error = errors.find(err => err.rule);

    if (error) {
      setValidationError(error);
    } else {
      setValidationError(null);
    }
  };

  const getValidationAttribute = () => {
    if (isTouched) {
      return validationError ? { invalid: true } : { valid: true };
    }
    return {};
  };

  return (
    <>
      {isAuthenticated ? (
        <Button color="dark" onClick={toggle} className="add-btn">
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please login to manage items</h4>
      )}
      <Modal isOpen={modalIsOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shoping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit} autocomplete="off">
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                value={name}
                placeholder="Add Shoping Item"
                onChange={onChange}
                {...getValidationAttribute()}
              />
              <FormFeedback>
                {validationError ? validationError.msg : ''}
              </FormFeedback>
              <Button
                color="success"
                outline
                className="add-btn-modal"
                block
                disabled={validationError}
              >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  items: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  items: state.items.items
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
