import React from 'react';
import { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Spinner
} from 'reactstrap';

const ShopingList = props => {
  const { items, getItems, deleteItem, isAuthenticated, loading } = props;

  const onDeleteClick = id => () => {
    deleteItem(id);
  };

  useEffect(getItems, []);

  return loading ? (
    <Spinner className="spinner" color="info" />
  ) : (
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
                {isAuthenticated ? (
                  <Button
                    close
                    onClick={onDeleteClick(_id)}
                    className="remove-btn"
                    size="sm"
                  />
                ) : null}
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
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  items: state.items.items,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.items.loading
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShopingList);
