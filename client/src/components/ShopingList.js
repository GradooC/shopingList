import React from "react";
import { useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";

const ShopingList = props => {
  const { items, getItems, deleteItem } = props;

  const onDeleteClick = id => () => {
    deleteItem(id);
  };

  useEffect(getItems, []);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shoping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition
              key={_id}
              timeout={500}
              classNames="scale-fade"
              className="list-item"
            >
              <ListGroupItem>
                {name}
                <Button
                  onClick={onDeleteClick(_id)}
                  className="remove-btn"
                  size="sm"
                  color="danger"
                >
                  &times;
                </Button>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

ShopingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  items: state.items.items
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShopingList);
