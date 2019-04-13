import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const ItemModal = props => {
  const { addItem } = props;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");

  const toggle = () => setModalIsOpen(prevModal => !prevModal);

  const onChange = e => setName(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    const newItem = { name };

    addItem(newItem);
    toggle();
    setName("");
  };

  return (
    <>
      <Button color="dark" onClick={toggle} className="add-btn">
        Add Item
      </Button>
      <Modal isOpen={modalIsOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shoping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add Shoping Item"
                onChange={onChange}
              />
              <Button
                color="success"
                outline
                className="add-btn-modal"
                block
                disabled={name === ""}
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
  addItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { addItem }
)(ItemModal);
