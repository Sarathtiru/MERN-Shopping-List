//@ts-check
import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getItems, deleteItem } from "../actions/itemActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ShoppingList = props => {
  //const [itemsArray, setItems] = useState(props.item);

  const { getItems } = props;
  useEffect(() => {
    getItems();
  }, [getItems]);

  const onDeleteClick = id => {
    props.deleteItem(id);
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {props.item.items.map(ele => (
            <CSSTransition key={ele._id} timeout={500} classNames="fade">
              <ListGroupItem>
                {props.isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      onDeleteClick(ele._id);
                    }}
                  >
                    &times;
                  </Button>
                ) : null}

                {ele.name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
